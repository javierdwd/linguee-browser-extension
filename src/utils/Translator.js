import { messageRuntime } from "./Message";

const callBackground = function(props) {
  return new Promise((resolve, reject) => {
    messageRuntime(props)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export function lookForTranslation(term) {
  return callBackground({
    subject: "requestTranslation",
    term
  });
}

export function getLangs() {
  return callBackground({
    subject: "getLangs"
  });
}

export function getAvailablesLangsByCode(code) {
  return callBackground({
    subject: "getAvailablesLangsByCode",
    code
  });
}

export default {
  lookForTranslation,
  getLangs,
  getAvailablesLangsByCode
};
