<template>
  <base-input-label class="input-text-field" :text="label" :delimiter="$attrs.delimiter || undefined" :top-label="$attrs['top-label']" :baseline-label="$attrs['baseline-label']">
    <input v-bind="$attrs" :type="type" :value="value" @input="onInput">
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
      default: 'TextField'
    },
    topLabel: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number],
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
.input-text-field {
  /* empty */
}

input {
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: calc(5 / 12 * 1em);
  font-family: monospace;
  font-size: calc(12 / 16 * 1em);
  color: currentColor;
  resize: none;
  background: transparent;
  border: solid var(--color-primary) calc(1 / 12 * 1em);
  outline: none;
  appearance: none;

  &[type="number"] {
    font-weight: bold;
  }

  &::placeholder {
    color: var(--color-primary-50);
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:not(&[disabled]) {
    &:focus,
    &:hover {
      color: var(--color-secondary);
      background: var(--color-primary);

      &::placeholder {
        color: var(--color-secondary-50);
      }
    }
  }
}
</style>
