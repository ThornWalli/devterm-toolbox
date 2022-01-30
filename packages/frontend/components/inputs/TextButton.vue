<template>
  <base-generic-button v-bind="$attrs" :type="type" class="input-text-button" :class="{[`color-${color}`]: color}" v-on="$listeners">
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
  padding: em(4, 12) em(8, 12);
  font-family: var(--font-primary);
  font-size: em(12);
  line-height: 1;
  color: var(--color-primary);
  cursor: pointer;
  background: transparent;
  border: solid var(--color-primary) 1px;
  opacity: 0.8;

  /* transition: background 0.8s, color 0.8s, opacity 0.8s; */

  &:focus,
  &:hover {
    opacity: 1;

    /* transition: background 0.3s, color 0.3s, opacity 0.3s; */
  }

  &.color-primary {
    color: var(--color-secondary);
    background: var(--color-primary);

    &:active {
      color: var(--color-primary);
      background: var(--color-secondary);
    }
  }

  &.color-danger {
    color: red;
    background: #000;
    border-color: red;

    &:active {
      color: #000;
      background: red;
    }
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
