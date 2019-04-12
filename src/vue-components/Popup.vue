<template>
  <div id="extension-popup">
    <p v-if="showMessage">{{ message }}</p>

    <div class="progress" v-if="showSpinner">
      <div class="indeterminate"></div>
    </div>

    <results-panel v-if="showLingueeResults" :linguee="results"></results-panel>

    <search-box v-if="!showLingueeResults" @result="onResult"></search-box>
  </div>
</template>

<script>
import Store from "/utils/Store";
import ResultsPanel from "./results/ResultsPanel.vue";
import SearchBox from "./SearchBox.vue";

export default {
  components: {
    ResultsPanel,
    SearchBox
  },

  data() {
    return {
      message: "No translation could be found.",
      results: null,
      showLingueeResults: false
    };
  },

  computed: {
    showMessage() {
      return !this.showSpinner && this.results && this.results.noResults;
    },
    showSearchBox() {
      return !Store.get("lookingForTranslation");
    },
    showSpinner() {
      return Store.get("lookingForTranslation");
    }
  },

  methods: {
    onResult(results) {
      this.results = results;

      if (results.noResults === false && results.words.length) {
        this.showLingueeResults = true;
      } else {
        this.showLingueeResults = false;
      }
    }
  }
};
</script>

<style lang="scss">
@import "../styles/popup.scss";
</style>
