<template>
  <li class="collection-item" :class="{ 'confirm-mode': confirmMode }">
    <div class="term">{{ item.queryTerm }}</div>

    <div class="actions basic">
      <a href="#">
        <i class="material-icons" @click.prevent="$emit('search', item.queryTerm)">search</i>
      </a>
      <a href="#" @click.prevent="setConfirmMode(true)">
        <i class="material-icons">delete</i>
      </a>
    </div>
    <div class="actions confirm-remove">
      <a href="#" class="cancel" @click.prevent="setConfirmMode(false)">Cancel</a>
      <a href="#" class="confirm" @click.prevent="$emit('delete', item.id)">Confirm</a>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      confirmMode: false
    };
  },

  methods: {
    setConfirmMode(payload) {
      this.confirmMode = payload;
    }
  }
};
</script>
