<template>
  <div class="app-menu">
    <ul><slot /></ul>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="postcss" scoped>
.app-menu {
  user-select: none;
}

ul {
  display: flex;
  padding: 0 calc(8 / 16 * 1em);
  margin: 0;
  list-style: none;
}
</style>
