<template>
  <div class="controls-font-options">
    <input-drop-down v-model="model.fontFamily" label="Family" :options="fontOptions" @input="onInputFontFamily" />
    <input-drop-down v-model="variant" label="Variante" :options="variantOptions" @input="onInputVariante" />
    <input-drop-down
      v-model="model.align"
      label="Align"
      :options="alignOptions"
      @input="model.align = $event"
    />
    <input-text-field
      step="1"
      min="0"
      type="number"
      :value="model.fontSize"
      label="Font Size"
      @input="model.fontSize = $event || 0"
    />
    <input-text-field
      step="1"
      min="0"
      type="number"
      :value="model.wordGap"
      label="Word Gap"
      @input="model.wordGap = $event || 0"
    />
    <input-text-field
      step="1"
      min="0"
      type="number"
      :value="model.lineSpace"
      label="Line Space"
      @input="model.lineSpace = $event || 0"
    />  <div class="cols">
      <div>
        <input-check-box v-model="model.underline" label="Underline" />
      </div>
      <div>
        <input-check-box v-model="model.justify" label="Text justify" />
      </div>
    </div>
  </div>
</template>

<script>
import { DropDownOptionDescription } from '../base/DropDown.vue';

import InputTextField from '../inputs/TextField.vue';
import InputDropDown from '../inputs/DropDown.vue';
import InputCheckBox from '../inputs/CheckBox.vue';
import { FONT_ALIGN, getDefaultFontOptions } from '../../utils/action';

export default {

  components: {
    InputTextField,
    InputDropDown,
    InputCheckBox
  },

  props: {
    value: {
      type: Object,
      default () {
        return getDefaultFontOptions();
      }
    }
  },
  data () {
    const fonts = this.$config.fonts;
    return {
      variant: '0',
      fonts,
      alignOptions: [
        ['Left', FONT_ALIGN.LEFT],
        ['Center', FONT_ALIGN.CENTER],
        ['Right', FONT_ALIGN.RIGHT]
      ].map(([title, value]) => new DropDownOptionDescription({ title, value: String(value) })),
      fontOptions: [{ title: 'Select Font', value: '' }].concat(this.$config.fonts.map(font => new DropDownOptionDescription({ title: font.name, group: font.group, value: font.value }))),
      // #####
      model: this.value
    };
  },
  computed: {
    currentFont () {
      return this.$config.fonts.find(font => font.value === this.model.fontFamily);
    },
    variantOptions () {
      if (this.currentFont) {
        return this.currentFont.variants.map(({ weight, italic }, index) => new DropDownOptionDescription({
          title: String(weight),
          group: italic ? 'Iatlic' : 'Normal',
          value: String(index)
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
        this.model = { ...this.model, weight, italic };
      }
    },
    model: {
      handler (model) {
        this.$emit('input', model);
      },
      deep: true
    }
  },
  methods: {
    onInputFontFamily () {
      this.variant = '0';
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
.controls-font-options {
  &:not(:first-child) {
    margin-top: em(8);
  }
}

</style>
