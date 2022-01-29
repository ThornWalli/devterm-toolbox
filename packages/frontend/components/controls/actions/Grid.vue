<template>
  <action-dialog
    v-bind="$attrs"
    title="Grid"
    class="action-dialog-grid"
    form
    v-on="Object.assign({}, $listeners, {input:[]})"
    @submit="onSubmit"
  >
    <template #default>
      <app-tab-container class="tab-container">
        <template #general="options">
          <base-tab-container-content v-bind="options" title="General">
            <div class="cols">
              <div>
                <input-text-field
                  label="Column Gutter"
                  :step="1"
                  :min="0"
                  :value="String(value.options.columnGutter)"
                  type="number"
                  @input="model.options.columnGutter = Number($event); updateModel()"
                />
              </div>
              <div>
                <input-text-field
                  label="Row Gutter"
                  :step="1"
                  :min="0"
                  :value="String(value.options.rowGutter)"
                  type="number"
                  @input="model.options.rowGutter = Number($event); updateModel()"
                />
              </div>
            </div>
            <div class="column">
              <input-drop-down v-model="column" :options="columnOptions" label="Column" />
              <input-text-button color="primary" @click="onClickAddColumn">
                Add
              </input-text-button> <input-text-button :disabled="model.data.length < 2" @click="onClickRemoveColumn">
                Remove
              </input-text-button>
            </div>
            <input-text-field
              label="Width"
              :step="0.01"
              :max="1"
              :min="0.01"
              :value="String(value.widths[column])"
              type="number"
              @input="model.widths[column] = Number($event); updateModel()"
            />
            <actions
              :key="column"
              :colors="colors"
              embed
              :native-actions="false"
              :value="currentColumn"
              @input="model.data[column] = $event; updateModel()"
            />
          </base-tab-container-content>
        </template>

        <template #imageOptions="options">
          <base-tab-container-content v-bind="options" title="Image Options">
            <controls-image-options :value="model.imageOptions" @input="model.imageOptions = $event; updateModel()" />
          </base-tab-container-content>
        </template>
      </app-tab-container>
    </template>
  </action-dialog>
</template>

<script>
import ActionDescription from '../../../classes/ActionDescription';
import ActionDialog from '../../controls/ActionDialog.vue';
import AppTabContainer from '../../app/TabContainer.vue';
import BaseTabContainerContent from '../../base/tabContainer/Content.vue';

import { DropDownOptionDescription } from '../../base/DropDown.vue';
import { getDefaultGridOptions } from '../../../utils/action';
import InputDropDown from '../../inputs/DropDown.vue';
import InputTextField from '../../inputs/TextField.vue';
import InputTextButton from '../../inputs/TextButton.vue';

import ControlsImageOptions from '../ImageOptions.vue';

import MixinDialog from '../../../mixins/Dialog.vue';
import Actions from '../../Actions.vue';

export default {
  components: {
    ActionDialog,
    AppTabContainer,
    BaseTabContainerContent,
    Actions,
    InputDropDown,
    InputTextField,
    InputTextButton,
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
        return getDefaultGridOptions();
      }
    }
  },
  data () {
    return {
      column: 0,
      type: 'text',
      model: { ...this.value },
      errorCorrectionLevelOptions: [
        ['Low', 'L'],
        ['Medium', 'M'],
        ['Quartile', 'Q'],
        ['High', 'H']
      ].map(([title, value]) => new DropDownOptionDescription({ title, value }))
    };
  },
  computed: {
    currentColumn () {
      return this.value.data[this.column].map(v => new ActionDescription(v));
    },
    columnOptions () {
      return this.value.data.map((v, index) => new DropDownOptionDescription({ title: `${index + 1}`, value: String(index) }));
    }
  },
  methods: {
    updateModel (model = this.model) {
      model.data = model.data.map(column => column.map(v => new ActionDescription(v)));
      this.model = { ...model };
      this.$emit('input', { ...model });
    },

    onClickAddColumn () {
      this.model.data.push([]);
      this.column = this.model.data.length - 1;
      this.updateModel();
    },
    onClickRemoveColumn () {
      const column = this.column;
      this.column = Math.max(column - 1, 0);
      this.model.data.splice(column, 1);
      this.updateModel();
    },

    onSubmit (e) {
      e.preventDefault();
      // this.close();
    }
  }
};

</script>

<style lang="postcss" scoped>
.action-dialog-grid {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  & >>> dialog {
    position: fixed !important;
    top: em(24) !important;
    right: 0 !important;
    bottom: em(24) !important;
    left: auto !important;
    width: 50% !important;
    height: auto !important;
    margin: 0;
  }

  & >>> .actions {
    padding: 0;
    margin: 0;
    margin-top: em(16);
  }

  & .column {
    display: flex;
    margin-bottom: em(8);

    & > * + * {
      margin-left: em(8, 12);
    }

    & > *:first-child {
      flex: 1;
    }
  }
}
</style>
