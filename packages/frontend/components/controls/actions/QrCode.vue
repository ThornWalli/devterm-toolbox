<template>
  <action-dialog
    v-bind="$attrs"
    title="QR Code"
    class="action-dialog-qr-code"
    form
    v-on="Object.assign({}, $listeners, {input:[]})"
    @submit="onSubmit"
  >
    <template #default>
      <app-tab-container class="tab-container">
        <template #general="options">
          <base-tab-container-content v-bind="options" title="General">
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
            <div class="cols">
              <div><input-check-box v-model="model.options.small" label="Small" /></div>
            </div>
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
import ActionDialog from '../../controls/ActionDialog.vue';
import AppTabContainer from '../../app/TabContainer.vue';
import BaseTabContainerContent from '../../base/tabContainer/Content.vue';

import InputCheckBox from '../../inputs/CheckBox.vue';
import InputDropDown from '../../inputs/DropDown.vue';
import InputTextField from '../../inputs/TextField.vue';
import InputTextBox from '../../inputs/TextBox.vue';

import ControlsImageOptions from '../ImageOptions.vue';

import { DropDownOptionDescription } from '../../base/DropDown.vue';
import { getDefaultQRCodeOptions } from '../../../utils/action';

import MixinDialog from '../../../mixins/Dialog.vue';

export default {
  components: {
    ActionDialog,
    AppTabContainer,
    BaseTabContainerContent,
    InputCheckBox,
    InputDropDown,
    InputTextField,
    InputTextBox,
    ControlsImageOptions
  },
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
  },
  methods: {
    onSubmit (e) {
      e.preventDefault();
      this.close();
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
    padding-top: em(8, 12);
    margin-top: em(8, 12);
    font-size: em(12, 16);
    border-top: solid var(--color-primary-50) 1px;

    & > span {
      /* empty */
    }
  }
}

</style>
