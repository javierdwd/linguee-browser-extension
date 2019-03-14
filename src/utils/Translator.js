import { messageRuntime } from "./Message";
import PopupStore from "./PopupStore";

const Translator = {};

export default Translator;

export function lookForTranslation(term) {
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
}
