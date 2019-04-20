<template>
  <div id="history" class="panel">
    <div class="container" v-if="ready">
      <div class="row">
        <div class="col s6">
          <history-list :list="latestList" @deleted="onDeleted">Latest translations</history-list>
        </div>
        <div class="col s6">
          <history-list :list="popularList" @deleted="onDeleted">Popular</history-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store, { loadRankings } from "/utils/Store";
import HistoryList from "./HistoryList";

export default {
  components: {
    HistoryList
  },

  data() {
    return {
      ready: false
    };
  },

  computed: {
    latestList: () => Store.get("historyLatest"),
    popularList: () => Store.get("historyPopular")
  },

  methods: {
    onDeleted() {
      loadRankings();
    }
  },

  created() {
    loadRankings()
      .then(() => {
        this.ready = true;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

