<template>
  <div id="history" class="panel">
    <div class="container" v-if="ready">
      <div class="row">
        <div class="col s6">
          <history-list :list="latestList">Latest translations</history-list>
        </div>
        <div class="col s6">
          <history-list :list="popularList">Popular</history-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRankings } from "/utils/Store";
import HistoryList from "./HistoryList";

export default {
  components: {
    HistoryList
  },

  data() {
    return {
      ready: false,
      latestList: [],
      popularList: []
    };
  },

  created() {
    getRankings()
      .then(rankings => {
        this.latestList = rankings.latest;
        this.popularList = rankings.popular;

        this.ready = true;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

