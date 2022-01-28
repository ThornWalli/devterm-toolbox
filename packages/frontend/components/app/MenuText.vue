<template>
  <li class="app-menu-text" v-bind="$attrs" v-on="$listeners">
    <slot><span v-html="text" /></slot>
  </li>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    text: {
      type: String,
      default: null
    }
  }
};
</script>
<style lang="postcss" scoped>
.app-menu-text {
  display: flex;
  align-self: center;
  justify-content: center;
  padding: 0 em(8, 12);
  font-size: em(12);
}
</style>
