<template>
  <canvas />
</template>

<script>
import { prepareCanvasForPrint } from 'devterm/utils/canvas';
import { ALIGN, MAX_DENSITY } from 'devterm/config';
import { getDefaultTextOptions } from '../../utils/action';
import { drawText, preparePreview } from '../../utils/canvas';
import { FONT_MAP } from '../../utils/font';

export default {
  props: {
    colors: {
      type: Object,
      default () {
        return { printer: { preview: { foreground: [255, 0, 0] } } };
      }
    },
    value: {
      type: Object,
      default () {
        return getDefaultTextOptions();
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
      ctx: null
    };
  },

  computed: {
    align () {
      return {
        [ALIGN.LEFT]: 'left',
        [ALIGN.CENTER]: 'center',
        [ALIGN.RIGHT]: 'right'
      }[this.options.align];
    },
    font () {
      return FONT_MAP[Number(this.options.font)];
    }
  },
  watch: {
    value () {
      this.render();
    }
  },
  mounted () {
    this.$el.width = this.width;
    this.ctx = this.$el.getContext('2d');
    this.render();
  },
  methods: {
    getColor (opacity = 1) {
      return `rgb(${this.colors.printer.preview.foreground.join(' ')} / ${opacity * 100}%)`;
    },
    render () {
      window.cancelAnimationFrame(this.animationFrame);
      this.animationFrame = window.requestAnimationFrame(() => {
        const ctx = this.ctx;
        const textCanvas = drawText(this.value.text, {
          ...this.value.options,
          margin: this.options.margin
        }, this.width, {
          background: this.colors.printer.preview.background,
          foreground: this.colors.printer.preview.foreground
        });
        let preparedCanvas = prepareCanvasForPrint(textCanvas, { ...this.value.imageOptions });
        preparedCanvas = preparePreview(preparedCanvas, {
          background: this.colors.printer.preview.background,
          foreground: this.colors.printer.preview.foreground
        }, 0.6 + 0.4 * (this.options.density / MAX_DENSITY));

        ctx.canvas.width = this.width;
        ctx.canvas.height = preparedCanvas.height;

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
