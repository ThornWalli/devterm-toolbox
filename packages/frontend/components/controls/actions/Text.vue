<template>
  <action-dialog
    v-bind="$attrs"
    title="Text"
    class="action-dialog-text"
    form
    v-on="Object.assign({}, $listeners, {input:[]})"
    @submit="onSubmit"
  >
    <template #default>
      <app-tab-container class="tab-container">
        <template #general="options">
          <base-tab-container-content v-bind="options" title="General">
            <input-text-box
              v-model="model.text"
              class="input"
              placeholder="Enter Text"
              :label="null"
              rows="10"
            />
            <div class="footer">
              <span>Rows: <span>{{ model.text.split('\n').length }}; Count: {{ model.text.length }}</span></span>
            </div>
          </base-tab-container-content>
        </template>
        <template #options="options">
          <base-tab-container-content v-bind="options" title="Options">
            <input-drop-down v-model="model.options.fontFamily" label="Family" :options="fontOptions" @input="onInputFontFamily" />
            <input-drop-down v-model="variant" label="Variante" :options="variantOptions" @input="onInputVariante" />
            <input-drop-down
              v-model="model.options.align"
              label="Align"
              :options="alignOptions"
              @input="model.options.align = Number($event)"
            />
            <input-text-field
              step="1"
              min="0"
              type="number"
              :value="model.options.fontSize"
              label="Font Size"
              @input="model.options.fontSize = $event || 0"
            />
            <input-text-field
              step="1"
              min="0"
              type="number"
              :value="model.options.wordGap"
              label="Word Gap"
              @input="model.options.wordGap = $event || 0"
            />
            <input-text-field
              step="1"
              min="0"
              type="number"
              :value="model.options.lineSpace"
              label="Line Space"
              @input="model.options.lineSpace = $event || 0"
            />
          </base-tab-container-content>
        </template>
        <template #imageOptions="options">
          <base-tab-container-content v-bind="options" title="Image Options">
            <controls-image-options v-model="model.imageOptions" />
          </base-tab-container-content>
        </template>
      </app-tab-container>
    </template>
  </action-dialog>
</template>

<script>
import { ALIGN } from 'devterm/config';
import { DropDownOptionDescription } from '../../base/DropDown.vue';
import ActionDialog from '../../controls/ActionDialog.vue';
import AppTabContainer from '../../app/TabContainer.vue';
import BaseTabContainerContent from '../../base/tabContainer/Content.vue';

import InputTextBox from '../../inputs/TextBox.vue';
import InputTextField from '../../inputs/TextField.vue';
import InputDropDown from '../../inputs/DropDown.vue';

import ControlsImageOptions from '../ImageOptions.vue';

import MixinDialog from '../../../mixins/Dialog.vue';
import { getDefaultTextOptions } from '../../../utils/action';

export default {
  components: {
    ActionDialog,
    AppTabContainer,
    BaseTabContainerContent,
    InputTextBox,
    InputTextField,
    InputDropDown,
    ControlsImageOptions
  },
  mixins: [MixinDialog],
  inheritAttrs: false,
  props: {
    value: {
      type: Object,
      default () {
        return getDefaultTextOptions();
      }
    }
  },
  data () {
    const fonts = this.$config.fonts;
    return {
      variant: null,
      fonts,
      updateTimeout: null,
      model: { ...this.value },
      alignOptions: [
        ['Left', ALIGN.LEFT],
        ['Center', ALIGN.CENTER],
        ['Right', ALIGN.RIGHT]
      ].map(([title, value]) => new DropDownOptionDescription({ title, value: String(value) })),
      fontOptions: [{ title: 'Select Font', value: '' }].concat(this.$config.fonts.map(font => new DropDownOptionDescription(font.name)))
    };
  },
  computed: {
    currentFont () {
      return this.$config.fonts.find(font => font.name === this.model.options.fontFamily);
    },
    variantOptions () {
      if (this.currentFont) {
        return this.currentFont.variants.map(({ weight, italic }, index) => new DropDownOptionDescription({
          title: String(weight),
          group: italic ? 'Iatlic' : 'Normal',
          value: index
        }));
      }
      return [];
    }
  },
  watch: {
    variant (variant) {
      const currentVariant = this.currentFont.variants[Number(variant)];
      if (currentVariant) {
        const {
          weight,
          italic
        } = this.currentFont.variants[Number(variant)];
        this.model.options = { ...this.model.options, weight, italic };
      }
    },
    model: {
      handler () {
        window.clearTimeout(this.updateTimeout);
        this.updateTimeout = window.setTimeout(() => {
          this.$emit('input', { ...this.model });
        }, 500);
      },
      deep: true
    }
  },
  methods: {
    onInputFontFamily () {
      this.variant = 0;
    },
    onInputVariante () {},
    onInput (e) {
      this.$emit('input', e);
    },
    onSubmit (e) {
      e.preventDefault();
      this.close();
    }
  }
};
</script>

<style lang="postcss" scoped>
.action-dialog-text {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  & .footer {
    padding-top: calc(8 / 16 * 1em);
    margin-top: calc(8 / 16 * 1em);
    font-size: calc(12 / 16 * 1em);
    opacity: 0.6;
  }
}

</style>
