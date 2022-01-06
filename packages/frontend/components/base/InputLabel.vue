<template>
  <label class="base-input-label" :class="{'top-label': topLabel,'baseline-label': baselineLabel}">
    <span v-if="text" class="label">{{ text }}{{ delimiter }}</span>
    <slot />
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    delimiter: {
      type: String,
      default: ':'
    },
    text: {
      type: String,
      default: 'Label'
    },
    topLabel: {
      type: Boolean,
      default: false
    },
    baselineLabel: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="postcss" scoped>
.base-input-label {
  display: inline-flex;
  align-items: center;

  & > .label {
    box-sizing: border-box;
    min-width: calc(120 / 12 * 1em);
    padding-right: calc(8 / 16 * 1em);
    font-size: calc(12 / 16 * 1em);
  }

  &.top-label {
    flex-direction: column;
    align-items: unset;

    & > .label {
      margin-bottom: calc(10 / 12 * 1em);
    }
  }

  &.baseline-label {
    align-items: baseline;
  }

  & + .base-input-label {
    margin-top: calc(8 / 12 * 1em);
  }
}
</style>
