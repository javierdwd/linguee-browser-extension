import browser from "webextension-polyfill";
import Vue from "vue";
import Store, { doSearch } from "/utils/Store";
import Popup from "/vue-components/Popup";
import { messageActiveTab } from "/utils/Message";

const renderPopup = () => {
  Store.setDebug(process.env.NODE_ENV === "development");

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
        doSearch(response.selection);
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
