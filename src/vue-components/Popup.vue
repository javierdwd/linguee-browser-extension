<template>
  <div id="extension-popup">
    <p v-if="!showTranslation">{{ message }}</p>

    <div class="progress" v-if="lookingForTranslation">
      <div class="indeterminate"></div>
    </div>

    <results :linguee="linguee" v-if="showTranslation"></results>
  </div>
</template>

<script>
import PopupStore from "../scripts/PopupStore";
import Results from "./popup/Results.vue";

export default {
  data() {
    return PopupStore;
  },
  components: {
    Results
  }
};
</script>

<style lang="scss">
@import "../styles/popup.scss";
</style>
