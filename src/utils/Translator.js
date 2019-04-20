import { messageRuntime } from "./Message";

const callBackground = function(props) {
  return messageRuntime(props);
};

export function lookForTranslation(term, langFrom, langTo) {
  return callBackground({
    subject: "requestTranslation",
    term,
    langFrom,
    langTo
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
