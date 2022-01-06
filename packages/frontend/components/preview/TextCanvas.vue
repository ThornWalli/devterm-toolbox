<template>
  <canvas />
</template>

<script>
import { ALIGN, MAX_DENSITY } from 'devterm/config';
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
      type: String,
      default: 'abcdef'
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
    getColor (opacity) {
      return `rgb(${this.colors.printer.preview.foreground.join(' ')} / ${opacity * 100}%)`;
    },
    render () {
      window.cancelAnimationFrame(this.animationFrame);
      this.animationFrame = window.requestAnimationFrame(() => {
        const ctx = this.ctx;
        const text = this.value; // 'Lorem ipsum dolor\n\n sit amet, **consetetur sadipscing elitr**, sed diam nonumy eirmod tempor invidunt \n\nut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

        const margin = [0, this.width * this.options.margin, 0, 0];
        const size = this.font.fontSize;
        const lineHeight = Math.max(this.options.lineSpace, size) / size;
        const align = this.align;
        let width = this.width;

        this.$el.style.letterSpacing = `${this.options.wordGap}px`;

        let x = 0;

        switch (align) {
          case 'right':
            x += width;
            width -= margin[1];
            break;
          case 'center':
            x += width / 2;
            width -= margin[1];
            break;
          default:
            x += margin[1];
            width -= margin[1];
            break;
        }
        ctx.font = `${size}px "${this.font.fontFamily}"`;
        ctx.textAlign = align;
        const rows = text.split('\n').map(text => prepareText(ctx, text, 0, 0, size, width)).flat();

        const dimension = [this.width, rows.length * size];
        this.$el.width = dimension[0];
        this.$el.height = dimension[1] * lineHeight + margin[0] + margin[2];

        ctx.fillStyle = this.getColor(this.options.density / MAX_DENSITY);

        ctx.font = `${size}px "${this.font.fontFamily}"`;

        ctx.textBaseline = 'top';
        ctx.textAlign = align;
        ctx.translate(0, margin[0]);
        rows.forEach((row, i) => ctx.fillText(row, x, i * lineHeight * size - (size - lineHeight * size) / 2));
      });
    }
  }
};

function prepareText (ctx, text, x, y, lineHeight, fitWidth, result = []) {
  fitWidth = fitWidth || 0;
  if (fitWidth <= 0) {
    return [text];
  }

  for (let idx = 1; idx <= text.length; idx++) {
    const str = text.substr(0, idx);
    if (ctx.measureText(str).width > fitWidth) {
      result.push(text.substr(0, idx - 1));
      result = result.concat(prepareText(ctx, text.substr(idx - 1), x, y + lineHeight, lineHeight, fitWidth));
      return result;
    }
  }
  result.push(text);
  return result;
}

</script>

<style lang="postcss" scoped>
canvas {
  display: block;

  /* background: white; */
}
</style>
