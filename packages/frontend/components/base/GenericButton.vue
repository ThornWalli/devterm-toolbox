<template>
  <button class="base-generic-button" v-on="$listeners">
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Button Text'
    }
  }
};
</script>
<style lang="postcss" scoped>
.base-generic-button {
  padding: 0;
  font-size: 1rem;
  color: currentColor;
  cursor: pointer;
  background: none;
  border: none;
  border-radius: 0;
  outline: none;
  appearance: none;
}
</style>
