import browser from "webextension-polyfill";
import Vue from "vue";
import Store, { readStorage, saveStorage } from "../utils/Store";
import Popup from "../vue-components/Popup";
import { messageActiveTab, logActiveTab } from "../utils/Message";
import { lookForTranslation } from "../utils/Translator";

const renderPopup = () => {
  Store.setDebug(true);

  new Vue({
    el: "#linguee-translator",
    render: h => h(Popup),
    data: Store.state,
    components: {
      Popup
    }
  });

  messageActiveTab({ subject: "requestSelection" })
    .then(response => {
      if (response && response.selection !== "") {
        lookForTranslation(response.selection);
      }
    })
    .catch(error => {
      console.log(error);
    });
};

// Inject content-script conditionally.
messageActiveTab({ subject: "listen" })
  .then(() => {
    renderPopup();
  })
  .catch(() => {
    browser.tabs.executeScript({
      file: "scripts/content.js"
    });

    renderPopup();
  });
