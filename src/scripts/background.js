import browser from "webextension-polyfill";
import linguee from "linguee-client";

const supportedData = apiResponse => {
  // No information of any kind was returned.
  if (apiResponse.noResults) {
    return false;
  }
  if (apiResponse.words.length) {
    return true;
  }

  return false;
};

const requestTranslation = async function(message) {
  const storage = await browser.storage.local.get({ tsCache: {} });
  const id = `${message.langFrom}-${message.langTo}-${message.term}`;

  const updateTsCache = async function(translation) {
    try {
      // Update/Insert translation.
      storage.tsCache[translation.id] = translation;

      // Replace the entire copy of tsCache in the browser.
      await browser.storage.local.set({
        tsCache: storage.tsCache
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (storage.tsCache.hasOwnProperty(id)) {
    storage.tsCache[id].hits++;

    updateTsCache(storage.tsCache[id]);

    return storage.tsCache[id];
  }

  const apiResponse = await linguee.translate(
    message.term,
    message.langFrom,
    message.langTo
  );

  const supported = supportedData(apiResponse);

  // Create a new Translation object.
  const translation = {
    id,
    queryTerm: apiResponse.queryTerm,
    time: Date.now(),
    hits: 1,
    data: supported ? apiResponse : null,
    tempData: apiResponse
  };

  if (supported) {
    updateTsCache(translation);
  }

  return translation;
};

const removeTranslation = async function(message) {
  const storage = await browser.storage.local.get({ tsCache: {} });

  if (storage.tsCache.hasOwnProperty(message.id)) {
    delete storage.tsCache[message.id];

    try {
      await browser.storage.local.set({
        tsCache: storage.tsCache
      });
    } catch (error) {
      console.log(error);

      return false;
    }

    return true;
  }
};

browser.runtime.onMessage.addListener(async (message, sender) => {
  if (message.subject === "requestTranslation") {
    return requestTranslation(message, sender);
  } else if (message.subject === "removeTranslation") {
    return removeTranslation(message, sender);
  } else if (message.subject === "getLangs") {
    return linguee.langs.list();
  } else if (message.subject === "getAvailablesLangsByCode") {
    return linguee.langs.available(message.code);
  }
});

// Remove old-format data.
browser.runtime.onInstalled.addListener(async details => {
  if (details.reason === "update" && details.previousVersion === "0.1.0") {
    const storage = await browser.storage.local.get({ tsCache: {} });

    for (let id in storage.tsCache) {
      if (storage.tsCache[id].hasOwnProperty("hits")) {
        continue;
      }

      delete storage.tsCache[id];
    }

    browser.storage.local.set({
      tsCache: storage.tsCache
    });
  }
});
