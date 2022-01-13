<template>
  <div>
    <preview-text-canvas v-if="error" :value="error.message" :colors="colors" :options="options" />
    <canvas v-else ref="canvas" />
  </div>
</template>

<script>
import { createCanvas, prepareCanvasForPrint } from 'devterm/utils/canvas';
import { ALIGN, MAX_DENSITY } from 'devterm/config';
import { preparePreview } from '../../utils/canvas';

import PreviewTextCanvas from '../preview/TextCanvas.vue';

export default {
  components: { PreviewTextCanvas },
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
        return {
          file: null
        };
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
      ctx: null,
      img: null
    };
  },

  watch: {
    async value () {
      if (this.value.file) {
        await this.changeImage(this.value.file);
      }
      this.render();
    }
  },
  async mounted () {
    this.value.file && await this.changeImage(this.value.file);
    this.render();
  },

  methods: {
    getColor (opacity = 1) {
      return `rgb(${this.colors.printer.preview.foreground.join(' ')} / ${opacity * 100}%)`;
    },
    changeImage (url) {
      return new Promise(resolve => {
        this.img = document.createElement('img');
        this.img.onload = () => {
          this.$el.height = this.img.naturalHeight;
          resolve();
        };
        this.img.src = url;
      });
    },
    render () {
      this.error = null;
      this.$nextTick(() => {
        const ctx = this.$refs.canvas.getContext('2d');
        window.requestAnimationFrame(() => {
          try {
            const imageCanvas = createCanvas(this.img.naturalWidth, this.img.naturalHeight);
            const imageContext = imageCanvas.getContext('2d');
            imageContext.drawImage(this.img, 0, 0);

            const preparedCanvas = prepareCanvasForPrint(imageCanvas, this.value.imageOptions);

            ctx.canvas.width = this.width;
            ctx.canvas.height = preparedCanvas.height;
            ctx.fillStyle = `rgb(${this.colors.printer.preview.background.join(' ')})`;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            const width = this.width;
            const margin = parseInt(this.options.margin * width);
            let x = 0;
            switch (this.options.align) {
              case ALIGN.RIGHT:
                x += this.width - preparedCanvas.width;
                break;
              case ALIGN.CENTER:
                x += (this.width - preparedCanvas.width) / 2;
                break;
              default:
                x += margin;
                break;
            }
            ctx.drawImage(preparedCanvas, x, 0);
            preparePreview(ctx.canvas, {
              background: this.colors.printer.preview.background,
              foreground: this.colors.printer.preview.foreground
            }, 0.6 + 0.4 * (this.options.density / MAX_DENSITY));
          } catch (error) {
            this.error = error;
          }
        });
      });
    }
  }
};

</script>

<style lang="postcss" scoped>
canvas {
  display: block;

  /* background: white; */
}
</style>
