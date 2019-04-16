<template>
  <li class="tab">
    <a :href="href" :class="{'active': active}" @click="onClick">
      <i class="material-icons small">
        <slot></slot>
      </i>
    </a>
  </li>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    href() {
      return `#${this.name}-tab`;
    }
  },

  methods: {
    onClick() {
      this.$emit("change-tab", this.name);
    }
  }
};
</script>

