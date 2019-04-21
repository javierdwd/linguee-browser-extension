<template>
  <ul class="collection with-header">
    <li class="collection-header">
      <h3>
        <slot></slot>
      </h3>
    </li>

    <history-item
      v-for="item in list"
      :item="item"
      :key="item.id"
      @search="onSearch"
      @delete="onDelete"
    ></history-item>
  </ul>
</template>

<script>
import { removeTranslation } from "/utils/Translator";
import { doSearch } from "/utils/Store";
import HistoryItem from "./HistoryItem";

export default {
  components: {
    HistoryItem
  },

  props: {
    list: {
      type: Array,
      default: []
    }
  },

  methods: {
    onSearch(searchCode) {
      doSearch(searchCode);
    },
    onDelete(id) {
      removeTranslation(id)
        .then(() => {
          this.$emit("deleted");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
