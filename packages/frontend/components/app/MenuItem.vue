<template>
  <li class="app-menu-item" :class="{'selected': selected}">
    <base-generic-button v-bind="$attrs" v-on="$listeners">
      <slot>{{ text }}</slot>
    </base-generic-button>
  </li>
</template>

<script>
import BaseGenericButton from '../base/GenericButton.vue';
export default {

  components: { BaseGenericButton },
  inheritAttrs: false,

  props: {
    selected: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: null
    }
  }

};
</script>

<style lang="postcss" scoped>
.app-menu-item {
  & + .app-menu-item {
    display: flex;
    align-items: center;
  }

  /*
  &:not(:last-child):not(.selected) {
    &::after {
      display: inline-block;
      width: 1px;
      height: 50%;
      content: "";
      background: var(--color-primary);
    }
  } */

  & > * {
    display: block;
    height: em(22, 12);
    padding: 0 em(8, 12);
    font-family: monospace;
    font-size: em(12);
    line-height: 1;
    cursor: pointer;

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  &:hover {
    & > *:not([disabled]) {
      color: var(--color-secondary);
      background: var(--color-primary-80);
    }
  }

  &:active,
  &.selected {
    & > *:not([disabled]) {
      color: var(--color-secondary);
      background: var(--color-primary);
    }
  }
}
</style>
