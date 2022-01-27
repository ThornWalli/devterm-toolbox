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
  width: em(1px);

  & i {
    display: block;
    width: 100%;
    height: em(12px);
    background: var(--color-primary);
  }
}
</style>
