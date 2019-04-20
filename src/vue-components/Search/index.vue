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
import { lookForTranslation, getLangs } from "/utils/Translator";
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
    missingLanguages() {
      return !this.langFrom || !this.langTo;
    },
    showSearchBox() {
      return !this.missingLanguages && !this.waitingResponse;
    }
  },

  methods: {
    onSearch(searchTerm) {
      this.cleanMessage();

      this.waitingResponse = true;

      lookForTranslation(searchTerm, this.langFrom, this.langTo)
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

