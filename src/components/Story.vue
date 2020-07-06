<template>
  <div>
    <p>{{ todo.name }}</p>
    <!-- <button>詳細</button> -->
  </div>
</template>

<script>
export default {
  props: {
    todo: Object
  }
};
</script>

<style>
</style>