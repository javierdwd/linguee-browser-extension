import Vue from "vue";
import Popup from "../vue-components/Popup";
import { messageActiveTab } from "../utils/Message";
import { lookForTranslation } from "../utils/Translator";

window.onload = () => {
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
      }
    })
    .catch(error => {
      console.log(error);
    });
};
