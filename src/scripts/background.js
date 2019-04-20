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

  if (storage.tsCache.hasOwnProperty(id)) {
    return storage.tsCache[id];
  }

  const apiResponse = await linguee.translate(
    message.term,
    message.langFrom,
    message.langTo
  );

  const supported = supportedData(apiResponse);

  const translation = {
    id,
    queryTerm: message.term,
    time: new Date().getTime(),
    hits: 1,
    data: supported ? apiResponse : null,
    tempData: apiResponse
  };

  if (supported) {
    try {
      storage.tsCache[translation.id] = translation;

      await browser.storage.local.set({
        tsCache: storage.tsCache
      });
    } catch (error) {
      console.log(error);
    }
  }

  return translation;
};

browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.subject === "requestTranslation") {
    return requestTranslation(message, sender, sendResponse);
  } else if (message.subject === "getLangs") {
    return linguee.langs.list();
  } else if (message.subject === "getAvailablesLangsByCode") {
    return linguee.langs.available(message.code);
  }
});
