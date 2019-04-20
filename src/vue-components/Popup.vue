<template>
  <div id="extension-popup">
    <div class="panels-container">
      <component :is="activePanel" v-if="ready"></component>
    </div>

    <navigation-bar></navigation-bar>
  </div>
</template>

<script>
import Store, { loadSettings } from "/utils/Store";
import Search from "./Search";
import Results from "./Results";
import Settings from "./Settings";
import NavigationBar from "./NavigationBar";

export default {
  components: {
    Search,
    Results,
    Settings,
    NavigationBar
  },

  data() {
    return {
      ready: false
    };
  },

  computed: {
    activePanel() {
      let panel = Store.get("panel");

      return panel[0].toUpperCase() + panel.substr(1);
    }
  },

  created() {
    loadSettings()
      .then(settings => {
        this.ready = true;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style lang="scss">
@import "../styles/popup.scss";
</style>
