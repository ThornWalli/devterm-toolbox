<template>
  <div :key="title" class="base-tab-container-content">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="postcss" scoped>
.base-tab-container-content {
  /* empty */
}

</style>
