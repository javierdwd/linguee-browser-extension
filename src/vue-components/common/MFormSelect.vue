<template>
  <div class="input-field">
    <select class="icons" :disabled="options.length < 1" ref="select">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="option.selected"
        :disabled="option.disabled"
        :data-icon="option.icon"
      >{{ option.text }}</option>
    </select>

    <label>
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },

  mFormSelectInst: null,

  methods: {
    createSelectInst() {
      const onCloseEnd = node => {
        this.$emit("change", this.$options.mFormSelectInst.el.value);
      };

      this.$options.mFormSelectInst = M.FormSelect.init(this.$refs["select"], {
        dropdownOptions: {
          isScrollable: true,
          onCloseEnd
        }
      });
    },
    destroyTabsInst() {
      if (this.$options.mFormSelectInst) {
        this.$options.mFormSelectInst.destroy();
      }
    }
  },

  mounted() {
    this.createSelectInst();
  },

  beforeUpdate() {
    this.destroyTabsInst();
  },

  updated() {
    this.createSelectInst();
  }
};
</script>

