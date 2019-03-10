<template>
  <div id="extension-popup">
    <p v-if="!showTranslation">{{ message }}</p>

    <div class="progress" v-if="lookingForTranslation">
      <div class="indeterminate"></div>
    </div>

    <PopupResults :linguee="linguee" v-if="showTranslation"></PopupResults>
  </div>
</template>

<script>
import PopupStore from "../scripts/PopupStore";
import PopupResults from "./popup/Results.vue";

export default {
  data() {
    return PopupStore;
  },
  components: {
    PopupResults
  }
};
</script>

<style lang="scss">
@import "../styles/popup.scss";
</style>
