<template>
  <div>
    <preview-native-text v-if="error" :value="error.message" :colors="colors" :options="options" />
    <canvas v-else ref="canvas" />
  </div>
</template>

<script>
import {
  ALIGN, MAX_DENSITY
} from 'devterm/config';
import { getDefaultGridOptions } from '../../utils/action';
import definitions from '../../utils/action/definitions';
import { preparePreview } from '../../utils/canvas';

import PreviewNativeText from './NativeText.vue';

export default {
  components: { PreviewNativeText },
  props: {
    colors: {
      type: Object,
      default () {
        return { base: [255, 0, 0] };
      }
    },
    value: {
      type: Object,
      default () {
        return getDefaultGridOptions();
      }
    },
    width: {
      type: Number,
      default: 384
    },
    options: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      error: null,
      ctx: null
    };
  },

  watch: {
    async value () {
      await this.render();
    }
  },

  async mounted () {
    await this.render();
  },

  methods: {
    render () {
      this.error = null;
      this.$nextTick(() => {
        const ctx = this.$refs.canvas.getContext('2d');
        window.requestAnimationFrame(async () => {
          try {
            let canvas = await render(this.value);

            canvas = preparePreview(canvas, {
              background: this.colors.printer.preview.background,
              foreground: this.colors.printer.preview.foreground
            }, 0.6 + 0.4 * (this.options.density / MAX_DENSITY));

            ctx.canvas.width = this.width;
            ctx.canvas.height = canvas.height;
            ctx.fillStyle = `rgb(${this.colors.printer.preview.background.join(' ')})`;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            const width = this.width;
            const margin = parseInt(this.options.margin * width);
            let x = 0;
            switch (this.options.align) {
              case ALIGN.RIGHT:
                x += this.width - canvas.width;
                break;
              case ALIGN.CENTER:
                x += (this.width - canvas.width) / 2;
                break;
              default:
                x += margin;
                break;
            }
            ctx.drawImage(canvas, x, 0);
          } catch (error) {
            this.error = error;
            throw error;
          }

          this.$emit('ready');
        });
      });
    }
  }
};

export const render = async (value) => {
  return (await definitions.grid.beforePrinterCommand({ value }, false)).value;
};

// export const render = async (rows, options) => {
//   const {
//     columnGutter, rowGutter
//   } = { columnGutter: 10, rowGutter: 10, ...options };

//   const rowGutterCount = (rows.length - 1);

//   const resolvedRows = await Promise.all(rows.map(async (column) => {
//     const gutterCount = (column.length - 1);
//     return await Promise.all(column.map(action => {
//       let columnWidth = parseInt(MAX_DOTS / column.length);
//       if (gutterCount > 0) {
//         columnWidth -= (columnGutter / gutterCount) * gutterCount;
//       }
//       const { value } = action;
//       (value.imageOptions = value.imageOptions || {}).width = columnWidth;
//       return definitions[String(action.type)].beforePrinterCommand({ ...action }, false);
//     }));
//   }));

//   const height = resolvedRows.reduce((result, values) => {
//     result += values.reduce((result, { value }) => {
//       return Math.max(value.height, result);
//     }, 0);
//     return result;
//   }, rowGutterCount * rowGutter);
//   const canvas = createCanvas(MAX_DOTS, height);
//   const ctx = canvas.getContext('2d');

//   let y = 0;
//   resolvedRows.forEach((column, row) => {
//     const maxY = 0;
//     console.log('y', y);
//     y += column.reduce((result, { value }, x) => {
//       ctx.drawImage(value, value.width * x + (x * columnGutter), y + (row * rowGutter));
//       return Math.max(value.height, result);
//     }, 0);
//     y = Math.max(maxY, y);
//   });

//   return canvas;
// };

</script>

<style lang="postcss" scoped>
canvas {
  display: block;

  /* background: white; */
}
</style>
