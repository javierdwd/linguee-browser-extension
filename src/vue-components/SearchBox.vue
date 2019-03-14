<template>
  <div id="search-box">
    <div class="input-field">
      <i class="material-icons prefix">search</i>
      <input id="icon_prefix" type="text" v-model="searchTerm" @keyup.enter="doSearch" autofocus>
      <label for="icon_prefix">Translate...</label>
    </div>
  </div>
</template>

<script>
import { lookForTranslation } from "../utils/Translator";

export default {
  data() {
    return {
      searchTerm: ""
    };
  },
  methods: {
    doSearch(term) {
      lookForTranslation(this.searchTerm);

      this.searchTerm = "";
    }
  }
};
</script>

<style lang="scss" scoped>
#search-box {
  padding-top: 5px;
}
</style>

