<template>
  <base-input-label class="input-check-box" :text="label" :delimiter="$attrs.delimiter || undefined" :top-label="$attrs['top-label']" :baseline-label="$attrs['baseline-label']">
    <input v-bind="$attrs" type="checkbox" :checked="value" @change="$emit('input', $event.target.checked)"><span />
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
    value: {
      type: Boolean,
      default: false
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
.input-check-box {
  --offset: em(2);

  & span {
    position: relative;
    display: block;
    width: em(16);
    height: em(16);
    cursor: pointer;
    border: solid var(--color-primary) 1px;

    &::before {
      position: absolute;
      top: var(--offset);
      right: var(--offset);
      bottom: var(--offset);
      left: var(--offset);
      display: block;
      content: "";
      background: var(--color-primary);
      opacity: 0.4;
    }
  }

  &:hover input:not([disabled]) + span,
  & input:checked + span {
    &::before {
      opacity: 1;
    }
  }

  & input[disabled] + span {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

input {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
