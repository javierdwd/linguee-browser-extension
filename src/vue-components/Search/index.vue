<template>
  <div id="search" class="panel">
    <search-box @search="onSearch" v-if="showSearchBox"></search-box>

    <notification-box v-if="notification" :type="notification.type">{{ notification.text }}</notification-box>

    <notification-box
      type="danger"
      v-if="missingLanguages"
    >Please, select two languages in the configuration panel.</notification-box>

    <preloader-spinner :active="waitingResponse"></preloader-spinner>
  </div>
</template>

<script>
import Store from "/utils/Store";
import {
  lookForTranslation,
  getLangs,
  parseSearchCode
} from "/utils/Translator";
import SearchBox from "./SearchBox";
import NotificationBox from "/vue-components/common/NotificationBox";
import PreloaderSpinner from "/vue-components/common/PreloaderSpinner";

export default {
  components: {
    SearchBox,
    NotificationBox,
    PreloaderSpinner
  },

  data() {
    return {
      waitingResponse: false,
      notification: null
    };
  },

  computed: {
    langFrom: () => Store.get("langFrom"),
    langTo: () => Store.get("langTo"),
    queueSearch: () => Store.get("queueSearch"),
    missingLanguages() {
      return !this.langFrom || !this.langTo;
    },
    showSearchBox() {
      return !this.missingLanguages && !this.waitingResponse;
    }
  },

  watch: {
    queueSearch(newValue) {
      if (newValue !== null) {
        this.onSearch(newValue);
      }
    }
  },

  methods: {
    onSearch(searchCode) {
      this.cleanMessage();

      this.waitingResponse = true;

      const st = parseSearchCode(searchCode);

      lookForTranslation(
        st.queryTerm,
        st.langFrom || this.langFrom,
        st.langTo || this.langTo
      )
        .then(translation => {
          if (translation.data) {
            Store.set("currentTranslation", translation);
            Store.set("panel", "results");
          } else {
            this.showMessage("No translation was found.");
          }
        })
        .catch(error => {
          this.showMessage("Unexpected error. Please try again.", "danger");

          console.log(error);
        })
        .finally(() => {
          this.waitingResponse = false;
        });
    },
    showMessage(text, type = "info") {
      this.notification = {
        text,
        type
      };
    },
    cleanMessage() {
      this.notification = null;
    }
  },

  mounted() {
    if (Store.get("queueSearch") && !this.missingLanguages) {
      this.onSearch(Store.get("queueSearch"));

      Store.set("queueSearch", null);
    }
  }
};
</script>

<style>
#search-box form {
  margin-top: 1.5rem;
}
.notification {
  margin-top: 3rem;
}
</style>

