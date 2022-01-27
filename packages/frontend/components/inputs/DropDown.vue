<template>
  <base-input-label class="input-drop-down" :text="label" :top-label="$attrs['top-label']" :baseline-label="$attrs['baseline-label']" :delimiter="$attrs.delimiter || undefined">
    <base-drop-down v-bind="$attrs" v-on="$listeners" />
  </base-input-label>
</template>

<script>
import BaseInputLabel from '../base/InputLabel.vue';
import BaseDropDown from '../base/DropDown.vue';
export default {
  components: {
    BaseInputLabel,
    BaseDropDown
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: 'Dropdown Label'
    }
  }
};
</script>

<style lang="postcss" scoped>
.input-drop-down {
  & >>> select {
    width: 100%;
    padding: em(4px, 12) em(5px, 12);
    font-family: monospace;
    font-size: em(12px);
    color: currentcolor;
    background: none;
    border: solid var(--color-primary) 1px;
    border-radius: 0;
    appearance: none;
    outline: none;

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &:focus,
    &:hover {
      color: var(--color-secondary);
      background: var(--color-primary);
    }

    & option {
      color: var(--color-primary);
      background: var(--color-secondary);
    }
  }
}
</style>
