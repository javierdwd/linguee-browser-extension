<template>
  <div class="notification" :class="type">
    <p>
      <slot></slot>

      <i class="material-icons">{{ icon }}</i>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "info",
      validator: value => {
        return ["info", "success", "danger"].indexOf(value) !== -1;
      }
    }
  },

  computed: {
    icon() {
      switch (this.type) {
        case "info":
          return "info";
          break;

        case "success":
          return "done";
          break;

        case "danger":
          return "error_outline";
          break;
      }
    }
  }
};
</script>
