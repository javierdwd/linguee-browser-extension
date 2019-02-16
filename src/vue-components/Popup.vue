<template>
  <div>
    <h1>Recompilado!</h1>
    <p v-if="!showTranslation">{{ message }}</p>

    <div v-if="showTranslation">
      <h2>{{ linguee.queryTerm }}</h2>

      <dl v-for="(word, index) in linguee.words" :key="index">
        <dt>{{ word.term }} ({{ word.type }})</dt>

        <dd v-for="(translation, index) in word.translations" :key="index">
          <div class="translation">
            <span
              class="translation__term"
            >{{ translation.term }} {{ translation.type ? `(${ translation.type })` : '' }}</span>
            <ul class="translation__examples" v-if="translation.examples">
              <li v-for="(example, index) in translation.examples" :key="index">
                <span class="translation__phrase">{{ example.phrase }}</span>
                <br>
                <span class="translation__translation">{{ example.translation }}</span>
              </li>
            </ul>
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import PopupStore from "../libs/PopupStore";

export default {
  data() {
    return PopupStore;
  }
};
</script>

<style lang="scss">
@import "../styles/popup.scss";
</style>
