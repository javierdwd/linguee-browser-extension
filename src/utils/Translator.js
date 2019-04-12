import { messageRuntime } from "./Message";

const Translator = {};

export default Translator;

export function lookForTranslation(term) {
  return new Promise((resolve, reject) => {
    messageRuntime({
      subject: "requestTranslation",
      term
    })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
