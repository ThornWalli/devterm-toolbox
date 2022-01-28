<template>
  <action-dialog
    v-bind="$attrs"
    title="Image"
    class="action-dialog-image"
    form
    @submit="onSubmit"
    v-on="Object.assign({}, $listeners, {input:[]})"
  >
    <template #default>
      <div v-if="previewDataUrl" class="preview">
        <img :src="previewDataUrl">
      </div>
      <input-file-select label="File" @input="onInputFileSelect" />
      <hr>
      <controls-image-options v-model="model.imageOptions" />
    </template>
  </action-dialog>
</template>

<script>
import { prepareCanvasForPrint } from 'devterm/utils/canvas';
import { MAX_IMAGE_WIDTH } from '../../../utils/config';
import { getCanvasFromUrl, preparePreview, resizeCanvas, toDataURL } from '../../../utils/canvas';

import ActionDialog from '../../controls/ActionDialog.vue';

import InputFileSelect from '../../inputs/FileSelect.vue';

import ControlsImageOptions from '../ImageOptions.vue';

import { getDefaultImageOptions } from '../../../utils/action';

import MixinDialog from '../../../mixins/Dialog.vue';

export default {
  components: { ActionDialog, InputFileSelect, ControlsImageOptions },
  mixins: [MixinDialog],
  inheritAttrs: false,
  props: {
    colors: {
      type: Object,
      default () {
        return {
          primary: [255, 0, 0],
          secondary: [0, 255, 0]
        };
      }
    },
    value: {
      type: Object,
      default () {
        return getDefaultImageOptions();
      }
    }
  },
  data () {
    return {
      updateTimeout: null,
      previewDataUrl: null,
      model: { ...this.value }
    };
  },
  watch: {
    model: {
      handler () {
        window.clearTimeout(this.updateTimeout);
        this.updateTimeout = window.setTimeout(() => {
          this.render();
          this.$emit('input', { ...this.model });
        }, 500);
      },
      deep: true
    },
    colors () {
      this.render();
    }
  },
  mounted () {
    this.render();
  },
  methods: {
    onInput (e) {
      this.$emit('input', e);
    },
    async onInputFileSelect (file) {
      if (file) {
        const url = await new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = e => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
        this.updateCanvas(url);
      } else {
        this.previewDataUrl = null;
      }
    },

    async updateCanvas (url) {
      let canvas = await getCanvasFromUrl(url);
      canvas = resizeCanvas(canvas, MAX_IMAGE_WIDTH);
      this.model = { ...this.model, file: toDataURL(canvas) };
      this.render();
    },

    async render () {
      let canvas = await getCanvasFromUrl(this.model.file);
      canvas = prepareCanvasForPrint(canvas, this.model.imageOptions);
      canvas = preparePreview(canvas, {
        background: this.colors.printer.preview.background,
        foreground: this.colors.printer.preview.foreground
      });
      canvas = resizeCanvas(canvas, null, 100);
      this.previewDataUrl = toDataURL(canvas);
    },

    async loadFromUrl () {
      try {
        await this.updateCanvas(this.url);
      } catch (error) {
        console.error(error);
      }
    },

    onSubmit (e) {
      e.preventDefault();
      this.close();
    }

  }
};

</script>

<style lang="postcss" scoped>
.action-dialog-image {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  & .preview {
    display: flex;
    justify-content: center;
    padding: em(4);
    margin: em(0) 0;
    margin-bottom: em(16);
    background: var(--color-primary-20);
  }

  & .input {
    flex: 1;
  }

  & .cols {
    column-count: 2;
    margin: em(8) 0;
  }

  & .footer {
    padding-top: em(8, 12);
    margin-top: em(8, 12);
    font-size: em(12);
    border-top: solid var(--color-primary-50) 1px;

    & > span {
      /* empty */
    }
  }
}

</style>
