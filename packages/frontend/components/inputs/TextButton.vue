<template>
  <base-generic-button :type="type" class="input-text-button" :class="{[`color-${color}`]: color}" v-bind="$attrs" v-on="$listeners">
    <slot>{{ text }}</slot>
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
    text: {
      type: String,
      default: 'Text Button'
    },
    type: {
      type: String,
      default: 'button'
    }
  }
};
</script>

<style lang="postcss" scoped>
.input-text-button {
  padding: calc(4 / 12 * 1em) calc(8 / 12 * 1em);
  font-family: monospace;
  font-size: calc(12 / 16 * 1em);
  color: var(--color-primary);
  cursor: pointer;
  background: transparent;
  border: solid var(--color-primary) 1px;
  opacity: 0.8;
  transition: background 0.8s, color 0.8s, opacity 0.8s;

  &:hover {
    opacity: 1;
    transition: background 0.3s, color 0.3s, opacity 0.3s;
  }

  &.color-primary {
    color: var(--color-secondary);
    background: var(--color-primary);

    &:active {
      color: var(--color-primary);
      background: var(--color-secondary);
      transition: background 0.3s, color 0.3s;
    }
  }

  &.color-danger {
    color: red;
    background: #000;
    border-color: red;

    &:active {
      color: #000;
      background: red;
      transition: background 0.3s, color 0.3s;
    }
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
