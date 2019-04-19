<template>
  <div id="settings" class="panel">
    <h3>Settings</h3>

    <div class="container">
      <div class="row">
        <div class="col s6">
          <m-form-select :options="fromOptions" @change="onChange('From', $event)">Translate From</m-form-select>
        </div>

        <div class="col s6">
          <m-form-select :options="toOptions" @change="onChange('To', $event)">To</m-form-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store, { saveLangSetting } from "/utils/Store";
import Translator from "/utils/Translator";
import MFormSelect from "/vue-components/common/MFormSelect";

const formatOptions = (langs, selectedVal) => {
  let options = [];
  selectedVal = selectedVal || "no-selected";

  options.push({
    disabled: true,
    selected: selectedVal === "no-selected",
    value: "no-selected",
    text: "Select language",
    icon: false
  });

  langs.forEach(lang => {
    options.push({
      disabled: false,
      selected: selectedVal === lang.langCode,
      value: lang.langCode,
      text: lang.langName,
      icon: lang.langFlag
    });
  });

  return options;
};

export default {
  components: {
    MFormSelect
  },

  data() {
    return {
      langs: [],
      fromOptions: [],
      toOptions: []
    };
  },

  methods: {
    onChange(selectName, selected) {
      if (
        selected === "no-selected" ||
        Store.get(`lang${selectName}`) === selected
      ) {
        return false;
      }

      saveLangSetting(`lang${selectName}`, selected);

      if (selectName === "From") {
        this.populateToOptions(selected);
      }
    },
    populateFromOptions(selected = false) {
      this.fromOptions = formatOptions(this.langs, selected);
    },
    populateToOptions(fromLang, selected = false) {
      return Translator.getAvailablesLangsByCode(fromLang).then(availables => {
        let onlyAvailable = aLangs => {
          return lang => {
            return aLangs.includes(lang.langCode);
          };
        };

        const aLangs = this.langs.filter(onlyAvailable(availables));

        selected = selected || aLangs[0].langCode;

        saveLangSetting(`langTo`, selected);

        this.toOptions = formatOptions(aLangs, selected);
      });
    },
    restorePreviousStatus() {
      if (Store.get("langFrom") !== null) {
        this.populateFromOptions(Store.get("langFrom"));

        if (Store.get("langTo")) {
          this.populateToOptions(Store.get("langFrom"), Store.get("langTo"));
        }
      } else {
        this.populateFromOptions();
      }
    }
  },

  mounted() {
    Translator.getLangs()
      .then(langsRaw => {
        let langs = [];
        let flagsFix = {
          en: "gb",
          zh: "cn",
          ja: "jp",
          da: "dk",
          el: "gr",
          cs: "cz"
        };

        for (let lCode in langsRaw) {
          let langOption = {};

          let flagCode = lCode.toLowerCase();

          if (flagsFix.hasOwnProperty(flagCode)) {
            flagCode = flagsFix[flagCode];
          }

          langOption.langName = langsRaw[lCode];
          langOption.langCode = lCode;
          langOption.langFlag = `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.3.0/flags/4x3/${flagCode}.svg`;

          langs.push(langOption);
        }

        this.langs = langs;

        this.restorePreviousStatus();
      })
      .catch(error => console.log(error));
  }
};
</script>

