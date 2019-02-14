import browser from "webextension-polyfill";

function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}

function insertHTML(data) {
  let html = `<h2>${data.queryTerm}</h2>`;

  html += "<dl>";

  data.words.forEach(word => {
    html += `<dt>${word.term} (${word.type})</dt>`;

    word.translations.forEach(translation => {
      html += "<dd>";
      html += '<div class="translation">';

      html += `<span class="translation__term">${translation.term} (${
        translation.type
      })</span>`;

      if (translation.examples) {
        html += '<ul class="translation__examples">';

        translation.examples.forEach(example => {
          html += `
            <li>
              <span class="translation__phrase">${example.phrase}</span>
              <br>
              <span class="translation__translation">${
                example.translation
              }</span>
            </li>
          `;
        });

        html += "</ul>";
      }

      html += "</div>";
      html += "</dd>";
    });
  });

  html += "</dl>";

  document.getElementById("linguee-translator").innerHTML = html;
}

window.onload = () => {
  getActiveTab().then(tabs => {
    browser.tabs
      .sendMessage(tabs[0].id, { subject: "requestSelection" })
      .then(response => {
        if (response && response.selection !== "") {
          browser.runtime
            .sendMessage({
              subject: "requestTranslation",
              term: response.selection
            })
            .then(data => {
              if (data.noResults === false && data.words.length) {
                insertHTML(data);
              }
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  });
};
