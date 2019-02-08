const browser = require('webextension-polyfill');

browser.runtime.onMessage.addListener((message, sender) => {
  if (message.subject === "requestSelection") {
    return Promise.resolve({
      selection: window.getSelection().toString().trim()
    });
  }
});
