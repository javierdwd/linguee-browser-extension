const browser = require("webextension-polyfill");
const linguee = require("linguee-client");

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.subject === "requestTranslation") {
    return linguee.translate(message.term, "english", "spanish");
  }
});
