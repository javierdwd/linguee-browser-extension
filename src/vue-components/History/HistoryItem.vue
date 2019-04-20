<template>
  <li class="collection-item">
    <div class="term">{{ item.queryTerm }}</div>

    <div class="actions basic active">
      <a href="#">
        <i class="material-icons">search</i>
      </a>
      <a href="#!">
        <i class="material-icons">delete</i>
      </a>
    </div>
    <div class="actions confirm-remove">
      <a href="#" class="cancel">Cancel</a>
      <a href="#" class="confirm">Confirm</a>
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
  }
};
</script>
