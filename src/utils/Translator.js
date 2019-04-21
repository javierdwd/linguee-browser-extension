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

export function parseSearchCode(searchCode) {
  const regExp = new RegExp("^([a-zA-Z]+)-([a-zA-Z]+)-(.+)$");
  const match = regExp.exec(searchCode);

  const result = {
    searchCode,
    isId: match !== null,
    queryTerm: match ? match[3] : searchCode,
    langFrom: match ? match[1] : null,
    langTo: match ? match[2] : null
  };

  return result;
}

export default {
  lookForTranslation,
  removeTranslation,
  getLangs,
  getAvailablesLangsByCode
};
