import { messageRuntime } from "./Message";

const callBackground = function(props) {
  return messageRuntime(props);
};

export function lookForTranslation(term, langFrom, langTo) {
  term = term.toLowerCase();
  langFrom = langFrom.toUpperCase();
  langTo = langTo.toUpperCase();

  return callBackground({
    subject: "requestTranslation",
    term,
    langFrom,
    langTo
  });
}

export function removeTranslation(id) {
  return callBackground({
    subject: "removeTranslation",
    id
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
  removeTranslation,
  getLangs,
  getAvailablesLangsByCode
};
