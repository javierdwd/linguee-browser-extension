<template>
  <ul class="collapsible" ref="linguee-results">
    <li v-for="(word, index) in linguee.words" :key="index" :class="{ active: (index === 0) }">
      <div class="collapsible-header word">
        <a class="word__audio-trigger" href="#">
          <i class="tiny material-icons">volume_up</i>
        </a>
        <div class="aux-wrapper">
          <span class="word__word blue-text text-darken-4">{{ word.term }}</span>
          <span
            class="word__context grey-text text-darken-1"
            v-if="word.additionalInfo && word.additionalInfo.context"
          >({{ word.additionalInfo.context }})</span>

          <span class="word__type grey-text">{{ word.type }}</span>
          <span
            class="word__verbs grey-text text-darken-1"
            v-if="word.additionalInfo && word.additionalInfo.verbs"
          >[{{ word.additionalInfo.verbs.join(', ') }}]</span>
          <span
            class="word__plural grey-text text-darken-1"
            v-if="word.additionalInfo && word.additionalInfo.plural"
          >
            (
            <strong class="grey-text text-lighten-1">Plural:</strong>
            {{ word.additionalInfo.plural }}
            )
          </span>
        </div>

        <i class="tiny material-icons expand-icon expand-less">more_horiz</i>
        <i class="tiny material-icons expand-icon expand-more">expand_more</i>
      </div>
      <div class="collapsible-body">
        <ul class="collection">
          <li
            v-for="(translation, index) in word.translations"
            :key="index"
            class="collection-item"
          >
            <span class="translation">
              <span class="translation__term grey-text text-darken-4">{{ translation.term }}</span>
              <span
                class="translation__type grey-text text-darken-1"
                v-if="translation.type"
              >{{ translation.type }}</span>
            </span>

            <div class="examples" v-if="translation.examples">
              <p class="example" v-for="(example, index) in translation.examples" :key="index">
                <span class="example__phrase grey-text text-darken-2">
                  <i class="material-icons blue-text text-accent-4">subdirectory_arrow_left</i>
                  {{ example.phrase }}
                </span>
                <span class="example__translation grey-text text-darken-2">
                  <i class="material-icons green-text text-accent-4">subdirectory_arrow_right</i>
                  {{ example.translation }}
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { logActiveTab } from "../../utils/Message";

let mCollapsibleInst;

export default {
  props: ["linguee"],
  methods: {
    createCollapsibleInst() {
      mCollapsibleInst = M.Collapsible.init(this.$refs["linguee-results"]);
    },
    destroyCollapsibleInst() {
      if (mCollapsibleInst) {
        mCollapsibleInst.destroy();

        mCollapsibleInst = undefined;
      }
    }
  },
  mounted() {
    this.createCollapsibleInst();
  },
  beforeUpdate() {
    this.destroyCollapsibleInst();
  },
  updated() {
    this.createCollapsibleInst();
  }
};
</script>
