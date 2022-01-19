<template>
  <div class="preview-feed-pitch" :style="{'--height': height}" />
</template>

<script>
import { FONT_DIMENSIONS } from 'devterm/config';
export default {
  props: {
    type: {
      type: String,
      default: 'font'
    },
    value: {
      type: [Number, String],
      default: 0
    },
    options: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  computed: {
    height () {
      const value = Number(this.value);
      if (this.type === 'font') {
        return FONT_DIMENSIONS[this.options.font][1] * value;
      }
      return value;
    }
  },
  mounted () {
    this.$emit('ready');
  }
};
// let { value, type } = action.value;
// if (type === 'font') {
//   value = value * FONT_HEIGHTS[options.font];
// }
</script>

<style lang="postcss" scoped>
.preview-feed-pitch {
  height: calc(var(--height) * 1px);
}
</style>
