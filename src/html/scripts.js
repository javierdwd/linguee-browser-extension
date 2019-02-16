import browser from "webextension-polyfill";
import Vue from "vue";
import PopupStore from "./PopupStore";
import Popup from "./components/Popup.vue";

function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}

window.onload = () => {
  new Vue({
    el: "#linguee-translator",
    render: h => h(Popup),
    components: {
      Popup
    }
  });

  getActiveTab().then(tabs => {
    browser.tabs
      .sendMessage(tabs[0].id, { subject: "requestSelection" })
      .then(response => {
        if (response && response.selection !== "") {
          PopupStore.message = "Recovering translation... please wait.";

          browser.runtime
            .sendMessage({
              subject: "requestTranslation",
              term: response.selection
            })
            .then(data => {
              if (data.noResults === false && data.words.length) {
                PopupStore.showTranslation = true;
                PopupStore.linguee = data;
              } else {
                PopupStore.message = "No translation could be found.";
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          PopupStore.message = "Please select a word to translate.";
        }
      })
      .catch(error => {
        console.log(error);
      });
  });
};
