<template>
  <div>
    <preview-native-text v-if="error" :value="error.message" :colors="colors" :options="options" />
    <canvas v-else ref="canvas" />
  </div>
</template>

<script>
import { ALIGN, MAX_DENSITY } from 'devterm/config';
import definitions from '../../utils/action/definitions';
import { preparePreview } from '../../utils/canvas';
import { getDefaultQRCodeOptions } from '../../utils/action';

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
        return getDefaultQRCodeOptions();
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
    getColor (opacity = 1) {
      return `rgb(${this.colors.printer.preview.foreground.join(' ')} / ${opacity * 100}%)`;
    },
    render () {
      this.error = null;
      this.$nextTick(() => {
        const ctx = this.$refs.canvas.getContext('2d');
        window.requestAnimationFrame(async () => {
          try {
            const canvas = await render(this.value);

            preparePreview(canvas, {
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
  return (await definitions.qrCode.beforePrinterCommand({ value }, false)).value;
};

</script>

<style lang="postcss" scoped>
canvas {
  display: block;

  /* background: white; */
}
</style>
