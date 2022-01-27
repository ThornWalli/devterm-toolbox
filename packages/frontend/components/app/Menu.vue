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
  padding: 0 em(8px);
  margin: 0;
  list-style: none;
}
</style>
