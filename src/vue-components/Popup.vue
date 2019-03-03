<template>
  <div id="extension-popup">
    <p v-if="!showTranslation">{{ message }}</p>

    <div class="progress" v-if="lookingForTranslation">
      <div class="indeterminate"></div>
    </div>

    <PopupResults :linguee="linguee" v-if="showTranslation"/>
    <keep-alive></keep-alive>

    <div class="hide">
      <h4 class="blue-text">{{ linguee.queryTerm }}</h4>

      <dl v-for="(word, index) in linguee.words" :key="index">
        <dt>
          <span class="blue-text text-darken-4">{{ word.term }}</span>
          ({{ word.type }})
        </dt>

        <dd v-for="(translation, index) in word.translations" :key="index">
          <div class="translation">
            <span class="translation__term">
              <span class="green-text text-darken-4">{{ translation.term }}</span>
              {{ translation.type ? `(${ translation.type })` : '' }}
            </span>
            <ul class="translation__examples" v-if="translation.examples">
              <li v-for="(example, index) in translation.examples" :key="index">
                <span class="translation__phrase blue-text text-accent-2">{{ example.phrase }}</span>
                <br>
                <span
                  class="translation__translation green-text text-accent-2"
                >{{ example.translation }}</span>
              </li>
            </ul>
          </div>
        </dd>
      </dl>
    </div>
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
