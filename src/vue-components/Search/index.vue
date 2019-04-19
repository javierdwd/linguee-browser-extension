<template>
  <div id="search" class="panel">
    <search-box></search-box>

    <notification-box type="info">No translation could be found.</notification-box>

    <preloader-spinner :active="true"></preloader-spinner>
  </div>
</template>

<script>
import SearchBox from "./SearchBox";
import NotificationBox from "/vue-components/common/NotificationBox";
import PreloaderSpinner from "/vue-components/common/PreloaderSpinner";

export default {
  components: {
    SearchBox,
    NotificationBox,
    PreloaderSpinner
  }
};
</script>

<style>
.notification {
  margin-top: 3rem;
}
</style>

