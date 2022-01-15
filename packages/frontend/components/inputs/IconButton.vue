<template>
  <base-generic-button class="input-icon-button" :class="{[`color-${color}`]: color}" v-on="$listeners">
    <i>
      <slot><component :is="svg" v-if="svg" /></slot>
    </i>
  </base-generic-button>
</template>

<script>
import BaseGenericButton from '../base/GenericButton.vue';
export default {
  components: {
    BaseGenericButton
  },
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: 'secondary' // primary, secondary
    },
    svg: {
      type: [Object, Function],
      required: false,
      default: null
    }
  }
};
</script>

<style lang="postcss" scoped>
.input-icon-button {
  color: currentColor;
  cursor: pointer;
  opacity: 0.8;
  transition: background 0.3s, opacity 0.3s;

  & i {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(12 / 16 * 1em);
  }

  &:hover {
    opacity: 1;
    transition: background 0.3s, opacity 0.3s;
  }

  &.color-primary {
    color: var(--color-secondary);
    background: var(--color-primary);

    &:active {
      color: var(--color-primary);
      background: var(--color-secondary);
      transition: background 0.3s;
    }
  }

  & >>> svg {
    fill: currentColor;
  }

  &:focus {
    color: var(--color-secondary);
    background: var(--color-primary);
  }
}
</style>
