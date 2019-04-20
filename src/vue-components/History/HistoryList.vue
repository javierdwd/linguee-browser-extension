<template>
  <ul class="collection with-header">
    <li class="collection-header">
      <h3>
        <slot></slot>
      </h3>
    </li>

    <history-item v-for="item in list" :item="item" :key="item.id"></history-item>
  </ul>
</template>

<script>
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
  }
};
</script>
