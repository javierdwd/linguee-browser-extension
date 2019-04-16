<template>
  <div id="extension-popup">
    <div class="panels-container">
      <div class="panel"></div>
    </div>

    <navigation-bar></navigation-bar>
  </div>
</template>

<script>
import Store from "/utils/Store";
import NavigationBar from "./NavigationBar";

export default {
  components: {
    NavigationBar
  }
};
</script>

<style lang="scss">
@import "../styles/popup.scss";
</style>
