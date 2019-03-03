<template>
  <ul class="collapsible" ref="linguee-results">
    <li v-for="(word, index) in linguee.words" :key="index" :class="{ active: (index === 0) }">
      <div class="collapsible-header">
        <a class="dropdown-trigger" href="#" data-target="dropdown1">
          <i class="tiny material-icons">volume_up</i>
        </a>
        <span class="blue-text text-darken-4">{{ word.term }}</span>
        ({{ word.type }})
        <i
          class="tiny material-icons"
        >{{ index === 0 ? 'expand_less' : 'expand_more' }}</i>
      </div>
      <div class="collapsible-body">
        <ul v-for="(translation, index) in word.translations" :key="index" class="collection">
          <li class="collection-item">
            <span class="translation__term">
              <span class="green-text text-darken-4">{{ translation.term }}</span>
              {{ translation.type ? `(${ translation.type })` : '' }}
            </span>

            <div v-if="translation.examples">
              <p v-for="(example, index) in translation.examples" :key="index">
                <span class="translation__phrase blue-text text-accent-2">{{ example.phrase }}</span>
                <br>
                <span
                  class="translation__translation green-text text-accent-2"
                >{{ example.translation }}</span>
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

<style>
</style>
