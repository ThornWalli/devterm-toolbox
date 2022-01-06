<template>
  <base-input-label class="input-file-select" :text="label" :delimiter="$attrs.delimiter || undefined">
    <input
      ref="input"
      type="file"
      :accept="accept"
      v-bind="$attrs"
      @change="onChange"
    >
    <span class="input">Select File</span>
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
    accept: {
      type: Array,
      default () {
        return ['image/png', 'image/jpg', 'image/jpeg', 'application/json'];
      }
    },
    label: {
      type: String,
      default: 'TextField'
    },
    value: {
      type: window.File,
      default: null
    }
  },
  methods: {
    onChange (e) {
      const files = (e.dataTransfer || e.target).files;
      this.$emit('input', files[0]);
      this.$refs.input.value = null;
    }
  }

};
</script>

<style lang="postcss" scoped>
.input-file-select {
  position: relative;

  & .input {
    display: block;
    width: 100%;
    height: 1em;
    padding: calc(5 / 12 * 1em);
    font-family: monospace;
    font-size: calc(12 / 16 * 1em);
    color: currentColor;
    text-align: center;
    border: dotted var(--color-primary) calc(1 / 12 * 1em);

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
  }

  /* empty */
}

input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
