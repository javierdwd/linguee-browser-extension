import browser from "webextension-polyfill";
import linguee from "linguee-client";

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.subject === "requestTranslation") {
    return linguee.translate(message.term, "english", "spanish");
  }
});
