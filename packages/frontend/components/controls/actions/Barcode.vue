<template>
  <action-dialog title="Barcode" class="action-dialog-barcode" v-bind="$attrs" v-on="Object.assign({}, $listeners, {input:[]})">
    <template #head>
      <slot name="head" />
    </template>
    <template #default>
      <input-text-box v-model="model.text" label="Text" baseline-label />
      <hr>
      <input-drop-down v-model="model.options.format" :options="formatOptions" label="Format" />
      <div class="cols">
        <div>
          <input-drop-down
            v-model="model.options.font"
            :options="fontOptions"
            label="Font"
          />
        </div>
        <div>
          <input-drop-down
            v-model="model.options.textAlign"
            :options="textAlignOptions"
            label="Text Align"
          />
        </div>
        <div>
          <input-drop-down
            v-model="model.options.textPosition"
            :options="textPositionOptions"
            label="Text Position"
          />
        </div>

        <div>
          <input-text-field
            :value="model.options.textMargin"
            type="number"
            min="0"
            step="1"
            label="Text Margin"
            @input="model.options.textMargin = Number($event || 0)"
          />
        </div>
        <div>
          <input-text-field
            type="number"
            min="1"
            step="1"
            label="Font Size"
            :value="model.options.fontSize"
            @input="model.options.fontSize = Number($event || 1)"
          />
        </div>
        <div>
          <input-text-field
            type="number"
            min="0"
            step="1"
            label="Margin"
            :value="model.options.margin"
            @input="model.options.margin = Number($event || 0)"
          />
        </div>
        <div>
          <input-check-box v-model="model.options.displayValue" label="Display Value" />
        </div>
        <div>
          <input-check-box v-model="model.options.flat" label="Flat" />
        </div>
      </div>
      <hr>
      <div class="cols">
        <div><input-check-box v-model="model.imageOptions.rotate" label="Rotate" /></div>
        <div><input-check-box v-model="model.imageOptions.flipX" label="Flip X" /></div>
        <div><input-check-box v-model="model.imageOptions.flipY" label="Flip Y" /></div>
      </div>
      <input-text-field
        v-model="model.imageOptions.width"
        type="number"
        min="1"
        step="1"
        label="width"
        placeholder="Size from Image (max. 384px)"
      />
    </template>
  </action-dialog>
</template>

<script>
import { FONT_MAP } from '../../../utils/font';
import { getDefaultBarcodeOptions } from '../../../utils/action';
import ActionDialog from '../../controls/ActionDialog.vue';

import InputCheckBox from '../../inputs/CheckBox.vue';
import InputDropDown from '../../inputs/DropDown.vue';
import InputTextField from '../../inputs/TextField.vue';
import InputTextBox from '../../inputs/TextBox.vue';

import { DropDownOptionDescription } from '../../base/DropDown.vue';
import MixinDialog from '../../../mixins/Dialog.vue';

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { ActionDialog, InputCheckBox, InputDropDown, InputTextField, InputTextBox },
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
        return getDefaultBarcodeOptions();
      }
    }
  },
  data () {
    return {
      type: 'text',
      model: { ...this.value },
      formatOptions: [
        ['Auto', ''],

        // CODE128
        ['CODE128', 'CODE128'],
        ['CODE128 A', 'CODE128A'],
        ['CODE128 B', 'CODE128B'],
        ['CODE128 C', 'CODE128C'],
        // EAN
        ['EAN13', 'EAN13'],
        ['UPC', 'UPC'],
        ['EAN8', 'EAN8'],
        ['EAN5', 'EAN5'],
        ['EAN2', 'EAN2'],

        ['CODE39', 'CODE39'],
        ['ITF-14', 'ITF14'],

        ['MSI', 'MSI'],
        ['MSI10', 'MSI10'],
        ['MSI11', 'MSI11'],
        ['MSI1010', 'MSI1010'],
        ['MSI1110', 'MSI1110'],

        ['Pharmacode', 'pharmacode'], // 1234
        ['Codabar', 'codabar'] // 1234567890 || C1234567890D
      ].map(([title, value]) => new DropDownOptionDescription({ title, value })),
      fontOptions: [
        ['Sans Serif', 'sans-serif'],
        ['Serif', 'serif'],
        ['monospace', 'monospace'],
        ['Fantasy', 'fantasy'],
        ['Cursive', 'cursive'],
        ...Array.from(new Set(Object.values(FONT_MAP).map(({ fontFamily }) => fontFamily))).map(fontFamily => [fontFamily, fontFamily])

      ].map(([title, value]) => new DropDownOptionDescription({ title, value })),

      textAlignOptions: [
        ['Left', 'left'],
        ['Center', 'center'],
        ['Right', 'right']
      ].map(([title, value]) => new DropDownOptionDescription({ title, value })),

      textPositionOptions: [
        ['Top', 'top'],
        ['Bottom', 'bottom']
      ].map(([title, value]) => new DropDownOptionDescription({ title, value }))

    };
  },
  watch: {
    model: {
      handler () {
        window.clearTimeout(this.updateTimeout);
        this.updateTimeout = window.setTimeout(() => {
          this.$emit('input', { ...this.model });
        }, 500);
      },
      deep: true
    }
  }
};

</script>

<style lang="postcss" scoped>
.action-dialog-barcode {
  /* empty */
}

</style>
