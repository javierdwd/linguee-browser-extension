<template>
  <div id="search-box">
    <h3>Enter the word you want to translate</h3>

    <form @submit.prevent autocomplete="off">
      <input autocomplete="false" name="hidden" type="text" class="hidden">

      <div class="input-field">
        <i class="material-icons prefix">search</i>
        <input id="search-input" type="text" v-model="searchTerm" @keyup.enter="doSearch" autofocus>
        <label for="search-input">Search...</label>
      </div>
    </form>
  </div>
</template>

<script>
import Store from "/utils/Store";
import { lookForTranslation } from "/utils/Translator";

export default {
  data() {
    return {
      searchTerm: ""
    };
  },

  methods: {
    doSearch($event) {
      Store.set("lookingForTranslation", true);

      lookForTranslation(this.searchTerm)
        .then(result => {
          this.$emit("result", result);

          Store.set("lookingForTranslation", false);

          this.searchTerm = "";
        })
        .catch(error => {
          console.log(error);

          this.searchTerm = "";
        });
    }
  }
};
</script>
