<template>
  <li class="app-menu-divider">
    <i />
  </li>
</template>

<script>
export default {

};
</script>
<style lang="postcss" scoped>
.app-menu-divider {
  display: flex;
  align-self: center;
  justify-content: center;
  width: calc(1 / 16 * 1em);

  & i {
    display: block;
    width: 100%;
    height: calc(12 / 16 * 1em);
    background: var(--color-primary);
  }
}
</style>
