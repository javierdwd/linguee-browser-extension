<template>
  <div id="history" class="panel">
    <div class="container">
      <div class="row">
        <div class="col s6">
          <history-list>Latest translations</history-list>
        </div>
        <div class="col s6">
          <history-list>Popular</history-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from "/utils/Store";
import HistoryList from "./HistoryList";

export default {
  components: {
    HistoryList
  }
};
</script>

