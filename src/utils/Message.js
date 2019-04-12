import browser from "webextension-polyfill";

export function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}

export function messageActiveTab(payload) {
  return new Promise((resolve, reject) => {
    getActiveTab()
      .then(tabs => {
        browser.tabs
          .sendMessage(tabs[0].id, payload)
          .then(response => resolve(response))
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function messageRuntime(payload) {
  return new Promise((resolve, reject) => {
    browser.runtime
      .sendMessage(payload)
      .then(response => resolve(response))
      .catch(error => {
        reject(error);
      });
  });
}

export function logActiveTab(data) {
  messageActiveTab({
    subject: "log",
    data
  }).catch(error => {
    console.log(error);
  });
}
