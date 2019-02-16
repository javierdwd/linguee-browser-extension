const path = require("path");
const fs = require("fs");

const dist = path.join(__dirname, "../dist/");
const common = {
  entries: [
    path.join(__dirname, "../src/manifest.webmanifest"),
    path.join(__dirname, "../src/scripts/background.js"),
    path.join(__dirname, "../src/scripts/content.js"),
    path.join(__dirname, "../src/html/popup.html"),
    path.join(__dirname, "../src/images/icons/*")
  ],
  renameManifest(bundle) {
    fs.access(dist + "manifest.webmanifest", fs.constants.W_OK, err => {
      if (!err) {
        fs.rename(
          dist + "manifest.webmanifest",
          dist + "manifest.json",
          err => {
            if (err) console.log("ERROR: " + err);
          }
        );
      }
    });
  }
};

module.exports = common;
