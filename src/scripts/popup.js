import browser from "webextension-polyfill";
import Vue from "vue";
import PopupStore from "./PopupStore";
import Popup from "../vue-components/Popup";
import { messageActiveTab, messageRuntime } from "../utils/Message";

window.onload = () => {
  const lookForTranslation = term => {
    PopupStore.message = "Recovering translation... please wait.";
    PopupStore.lookingForTranslation = true;

    messageRuntime({
      subject: "requestTranslation",
      term
    })
      .then(data => {
        if (data.noResults === false && data.words.length) {
          PopupStore.showTranslation = true;
          PopupStore.linguee = data;
        } else {
          PopupStore.message = "No translation could be found.";
        }

        PopupStore.lookingForTranslation = false;
      })
      .catch(error => {
        console.log(error);
      });
  };

  new Vue({
    el: "#linguee-translator",
    render: h => h(Popup),
    components: {
      Popup
    }
  });

  messageActiveTab({ subject: "requestSelection" })
    .then(response => {
      if (response && response.selection !== "") {
        lookForTranslation(response.selection);
      } else {
        PopupStore.message = "Please select a word to translate.";
      }
    })
    .catch(error => {
      console.log(error);
    });
};
