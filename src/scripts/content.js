import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener((message, sender) => {
  if (message.subject === "log") {
    console.log(message.data);
  } else if (message.subject === "requestSelection") {
    return Promise.resolve({
      selection: window
        .getSelection()
        .toString()
        .trim()
    });
  }
});
