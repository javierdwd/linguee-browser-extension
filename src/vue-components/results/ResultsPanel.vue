<template>
  <ul class="collapsible" ref="linguee-results">
    <results-word
      v-for="(word, index) in linguee.words"
      :key="index"
      :selected="word.selected"
      :class="{ active: (index === 0) }"
      :word="word"
    ></results-word>
  </ul>
</template>

<script>
import ResultsWord from "./ResultsWord";

let mCollapsibleInst;

export default {
  props: ["linguee"],

  components: {
    ResultsWord
  },

  methods: {
    createCollapsibleInst() {
      mCollapsibleInst = M.Collapsible.init(this.$refs["linguee-results"], {
        onOpenEnd: li => {
          const index = Array.from(li.parentElement.childNodes).indexOf(li);

          for (let word of this.linguee.words) {
            word.selected = false;
          }

          this.linguee.words[index].selected = true;
        }
      });

      this.linguee.words[0].selected = true;
    },
    destroyCollapsibleInst() {
      if (mCollapsibleInst) {
        mCollapsibleInst.destroy();

        mCollapsibleInst = undefined;
      }
    }
  },

  beforeMount() {
    for (let word of this.linguee.words) {
      this.$set(word, "selected", false);
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
