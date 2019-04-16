<template>
  <ul class="tabs popup-bar z-depth-1" ref="popup-bar">
    <navigation-button
      v-on:change-tab="onChangeTab"
      :active=" activeButton == 'search' "
      :name="'search'"
    >search</navigation-button>

    <navigation-button
      v-on:change-tab="onChangeTab"
      :active="activeButton == 'history'"
      :name="'history'"
    >history</navigation-button>

    <navigation-button
      v-on:change-tab="onChangeTab"
      :active="activeButton == 'settings'"
      :name="'settings'"
    >settings_applications</navigation-button>
  </ul>
</template>

<script>
import Store from "/utils/Store";
import NavigationButton from "./NavigationButton";

let mTabsInst;

export default {
  components: {
    NavigationButton
  },

  computed: {
    activeButton: () => Store.get("panel")
  },

  methods: {
    createTabsInst() {
      mTabsInst = M.Tabs.init(this.$refs["popup-bar"]);
    },
    destroyTabsInst() {
      if (mTabsInst) {
        mTabsInst.destroy();

        mTabsInst = undefined;
      }
    },
    onChangeTab(name) {
      Store.set("panel", name);
    }
  },

  mounted() {
    this.createTabsInst();
  },

  beforeUpdate() {
    this.destroyTabsInst();
  },

  updated() {
    this.createTabsInst();
  }
};
</script>
