<template>
  <li class="collection-item" :class="{ 'confirm-mode': confirmMode }">
    <div class="term">
      <span>{{ item.queryTerm }}</span>
    </div>

    <div class="actions basic">
      <a href="#" class="search" @click.prevent="$emit('search', item.id)">
        <i class="material-icons">search</i>
      </a>
      <a href="#" class="delete" @click.prevent="setConfirmMode(true)">
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
