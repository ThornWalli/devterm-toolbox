<template>
  <action-dialog title="QR Code" class="action-dialog-qr-code" v-bind="$attrs" v-on="Object.assign({}, $listeners, {input:[]})">
    <template #head>
      <slot name="head" />
    </template>
    <template #default>
      <input-text-box v-model="model.text" label="Text" baseline-label />
      <hr>
      <input-drop-down v-model="model.options.errorCorrectionLevel" :options="errorCorrectionLevelOptions" label="Correc. Lev." />

      <div class="cols">
        <div>
          <input-text-field
            :value="model.options.margin"
            type="number"
            label="Margin"
            step="1"
            min="0"
            @input="model.options.margin = $event || 0"
          />
        </div>
        <div>
          <input-text-field
            :value="model.options.scale"
            type="number"
            label="Scale"
            step="1"
            min="0"
            @input="model.options.scale = $event || 0"
          />
        </div>
      </div>

      <hr>
      <div class="cols">
        <div><input-check-box v-model="model.options.small" label="Small" /></div>
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
import ActionDialog from '../../controls/ActionDialog.vue';

import InputCheckBox from '../../inputs/CheckBox.vue';
import InputDropDown from '../../inputs/DropDown.vue';
import InputTextField from '../../inputs/TextField.vue';
import InputTextBox from '../../inputs/TextBox.vue';

import { DropDownOptionDescription } from '../../base/DropDown.vue';
import { getDefaultQRCodeOptions } from '../../../utils/action';

import MixinDialog from '../../../mixins/Dialog.vue';

export default {
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
        return getDefaultQRCodeOptions();
      }
    }
  },
  data () {
    return {
      type: 'text',
      model: { ...this.value },
      errorCorrectionLevelOptions: [
        ['Low', 'L'],
        ['Medium', 'M'],
        ['Quartile', 'Q'],
        ['High', 'H']
      ].map(([title, value]) => new DropDownOptionDescription({ title, value })),
      typeOptions: [
        ['Text', 'text'],
        ['Url', 'url']
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
.action-dialog-qr-code {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  & .input {
    flex: 1;
  }

  & .footer {
    padding-top: calc(8 / 16 * 1em);
    margin-top: calc(8 / 16 * 1em);
    font-size: calc(12 / 16 * 1em);
    border-top: solid var(--color-primary-50) 1px;

    & > span {
      /* empty */
    }
  }
}

</style>
