import browser from "webextension-polyfill";
import linguee from "linguee-client";

const requestTranslation = async function(message) {
  const storage = await browser.storage.local.get({ tsCache: {} });

  if (storage.tsCache.hasOwnProperty(message.term)) {
    return storage.tsCache[message.term];
  }

  const lingueeResult = await linguee.translate(
    message.term,
    "english",
    "spanish"
  );

  try {
    storage.tsCache[message.term] = lingueeResult;

    await browser.storage.local.set({
      tsCache: storage.tsCache
    });
  } catch (error) {
    console.log(error);
  }

  return lingueeResult;
};

browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.subject === "requestTranslation") {
    return requestTranslation(message, sender, sendResponse);
  }
});
