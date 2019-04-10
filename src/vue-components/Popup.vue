<template>
  <div id="extension-popup">
    <p v-if="showMessage">{{ message }}</p>

    <div class="progress" v-if="lookingForTranslation">
      <div class="indeterminate"></div>
    </div>

    <results-panel :linguee="linguee" v-if="showTranslation"></results-panel>

    <search-box v-if="!showTranslation && !lookingForTranslation"></search-box>
  </div>
</template>

<script>
import PopupStore from "../utils/PopupStore";
import ResultsPanel from "./results/ResultsPanel.vue";
import SearchBox from "./SearchBox.vue";

export default {
  data() {
    return PopupStore;
  },

  components: {
    ResultsPanel,
    SearchBox
  },

  computed: {
    showMessage() {
      return !this.showTranslation && this.message !== "";
    }
  }
};
</script>

<style lang="scss">
@import "../styles/popup.scss";
</style>
