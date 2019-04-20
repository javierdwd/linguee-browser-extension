<template>
  <div id="results" class="panel">
    <ul class="collapsible" ref="linguee-results" v-if="tData.words.length">
      <results-word
        v-for="(word, index) in tData.words"
        :key="index"
        :selected="word.selected"
        :class="{ active: (index === 0) }"
        :word="word"
      ></results-word>
    </ul>
  </div>
</template>

<script>
import Store from "/utils/Store";
import ResultsWord from "./ResultsWord";

let mCollapsibleInst;

export default {
  components: {
    ResultsWord
  },

  computed: {
    tData() {
      return Store.get("currentTranslation").data;
    }
  },

  methods: {
    createCollapsibleInst() {
      mCollapsibleInst = M.Collapsible.init(this.$refs["linguee-results"], {
        onOpenEnd: li => {
          const index = Array.from(li.parentElement.childNodes).indexOf(li);

          for (let word of this.tData.words) {
            word.selected = false;
          }

          this.tData.words[index].selected = true;
        }
      });

      this.tData.words[0].selected = true;
    },
    destroyCollapsibleInst() {
      if (mCollapsibleInst) {
        mCollapsibleInst.destroy();

        mCollapsibleInst = undefined;
      }
    }
  },

  beforeCreate() {
    if (Store.get("currentTranslation") === null) {
      Store.set("panel", "search");
    }
  },

  beforeMount() {
    for (let word of this.tData.words) {
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
  },

  destroyed() {
    Store.set("currentTranslation", null);
  }
};
</script>
