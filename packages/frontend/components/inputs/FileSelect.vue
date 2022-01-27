<template>
  <base-input-label tag="div" class="input-file-select" :text="label" :delimiter="$attrs.delimiter || undefined">
    <button
      v-bind="$attrs"
      type="button"
      class="select"
      :title="displayValue"
      @click="onClickSelect"
    >
      {{ displayValue }}
    </button>
    <input-text-button v-if="currentValue" @click="onClickReset">
      Reset
    </input-text-button>
  </base-input-label>
</template>

<script>
import { selectFiles } from '../../utils/dom';
import BaseInputLabel from '../base/InputLabel.vue';
import InputTextButton from './TextButton.vue';

export default {
  components: {
    BaseInputLabel,
    InputTextButton
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
        return `${currentValue}`;
      } else {
        return 'Select File';
      }
    }
  },
  methods: {
    async onClickSelect () {
      const files = await selectFiles(this.accept);
      if (files.length) {
        this.currentValue = files[0];
        this.$emit('input', files[0]);
      }
    },
    onClickReset () {
      this.currentValue = null;
      this.$emit('input', null);
    }
  }

};
</script>

<style lang="postcss" scoped>
.input-file-select {
  position: relative;

  & .select {
    display: block;
    width: 100%;

    /* height: 1em; */
    padding: em(4px, 12);
    overflow: hidden;
    font-family: monospace;
    font-size: em(12px);
    color: currentcolor;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: #000;
    border: dotted var(--color-primary) em(1px, 12);
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

    & + * {
      margin-left: em(4px, 12);
    }
  }

  /* empty */
}
</style>
