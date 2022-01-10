<template>
  <base-input-label class="input-file-select" :text="label" :delimiter="$attrs.delimiter || undefined">
    <input
      v-bind="$attrs"
      ref="input"
      type="file"
      :accept="accept"
      :title="displayValue"
      @change="onChange"
    >
    <span class="input">{{ displayValue }}</span>
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
      type: String,
      default: null
    }
  },
  data () {
    return { currentValue: this.value };
  },
  computed: {
    displayValue () {
      const currentValue = this.currentValue?.name || this.value;
      if (this.currentValue) {
        return `Change File (${currentValue})`;
      } else {
        return 'Select File';
      }
    }
  },
  methods: {
    onChange (e) {
      const files = (e.dataTransfer || e.target).files;
      this.currentValue = files[0];
      console.log(files[0]);
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
    overflow: hidden;
    font-family: monospace;
    font-size: calc(12 / 16 * 1em);
    color: currentColor;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
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
