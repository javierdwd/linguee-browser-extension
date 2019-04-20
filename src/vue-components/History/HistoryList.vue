<template>
  <ul class="collection with-header">
    <li class="collection-header">
      <h3>
        <slot></slot>
      </h3>
    </li>

    <history-item></history-item>
  </ul>
</template>

<script>
import HistoryItem from "./HistoryItem";

export default {
  components: {
    HistoryItem
  }
};
</script>
