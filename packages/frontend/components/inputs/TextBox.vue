<template>
  <base-input-label class="input-text-box" :text="label" :delimiter="$attrs.delimiter || undefined" :top-label="$attrs['top-label']" :baseline-label="$attrs['baseline-label']">
    <textarea v-bind="$attrs" :value="value" @input="onInput" />
    <!-- <span class="resizer">
      <svg-icon-resize />
    </span> -->
  </base-input-label>
</template>

<script>
import BaseInputLabel from '../base/InputLabel.vue';

export default {
  components: {
    BaseInputLabel
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: 'TextBox'
    },
    topLabel: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput (e) {
      this.$emit('input', e.target.value);
    }
  }

};
</script>

<style lang="postcss" scoped>
.input-text-box {
  position: relative;
}

textarea {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  font-family: monospace;
  font-size: calc(12 / 16 * 1em);
  line-height: calc(20 / 12);
  color: currentColor;
  resize: vertical;
  background: transparent;
  border: none;
  outline: none;
  appearance: none;

  &:not(&[disabled]) {
    &:focus,
    &:hover {
      color: var(--color-secondary);
      background: var(--color-primary);
    }
  }

  &::-webkit-resizer {
    display: block;
    width: calc(8 / 12 * 1em);
    height: calc(8 / 12 * 1em);
    background: transparent;
    border: solid var(--color-primary);
    border-width: 0 calc(1 / 12 * 1em) calc(1 / 12 * 1em) 0;
    outline: none;
    box-shadow: none;
  }

  &::placeholder {
    color: var(--color-primary-50);
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
