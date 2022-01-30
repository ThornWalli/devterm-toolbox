<template>
  <action-dialog
    v-bind="$attrs"
    title="Table"
    class="action-dialog-table"
    form
    :style="{'--columns': model.columns.length}"
    v-on="Object.assign({}, $listeners, {input:[]})"
    @submit="onSubmit"
  >
    <template #default>
      <app-tab-container class="tab-container">
        <template #general="options">
          <base-tab-container-content v-bind="options" title="General">
            <div class="table-wrapper">
              <table>
                <tbody>
                  <tr v-for="(row,y) in model.data" :key="y">
                    <td v-for="(index) in model.columns.length" :key="index - 1">
                      <input-text-field v-model="row[index - 1]" :placeholder="`Empty…`" class="value" :label="null" />
                    </td>
                    <td>
                      <input-text-button :disabled="1 === model.data.length" @click="onClickDeleteRow(y)">
                        X
                      </input-text-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="buttons">
              <input-text-button @click="onClickAddRow">
                Add Row
              </input-text-button>
            </div>
            <div class="buttons">
              <input-text-button @click="onClickImportCsv">
                Import CSV
              </input-text-button>
              <input-text-button @click="onClickReset">
                Reset
              </input-text-button>
            </div>
          </base-tab-container-content>
        </template>
        <template #tableOptions="options">
          <base-tab-container-content v-bind="options" title="Table">
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
              <div><input-check-box v-model="model.options.headActive" label="Head active" /></div>
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
              <div><input-check-box v-model="model.options.footActive" label="Foot active" /></div>
              <div />
              <div><input-check-box v-model="model.options.useColumnStyles" label="Column Styles" /></div>
            </div>
            <app-tab-container class="tab-container">
              <template #body="options">
                <base-tab-container-content v-bind="options" title="Body">
                  <controls-font-options :value="model.options.bodyOptions" @input="model.options.bodyOptions = $event; updateModel()" />
                </base-tab-container-content>
              </template>

              <template #head="options">
                <base-tab-container-content v-bind="options" title="Head">
                  <controls-font-options :value="model.options.headOptions" @input="model.options.headOptions = $event; updateModel()" />
                </base-tab-container-content>
              </template>

              <template #foot="options">
                <base-tab-container-content v-bind="options" title="Foot">
                  <controls-font-options :value="model.options.footOptions" @input="model.options.footOptions = $event; updateModel()" />
                </base-tab-container-content>
              </template>
            </app-tab-container>
          </base-tab-container-content>
        </template>
        <template #columnOptions="options">
          <base-tab-container-content v-bind="options" title="Columns">
            <input-text-field
              label="Column Count"
              :step="1"
              :min="1"
              :value="String(model.columns.length)"
              type="number"
              @input="updateColumns(Math.max(parseInt($event), 1))"
            />
            <input-drop-down v-model="column" label="Column" :options="columnOptions" />
            <div v-if="column" :key="column">
              <hr>
              <input-text-field
                label="Width"
                :step="0.01"
                :max="1"
                :min="0.01"
                :value="String(model.columns[column].width)"
                type="number"
                @input="model.columns[column].width = Number($event); updateModel()"
              />
              <hr>
              <app-tab-container class="tab-container">
                <template #body="options">
                  <base-tab-container-content v-bind="options" title="Body">
                    <controls-font-options :value="model.columns[column].options" @input="model.columns[column].options = $event; updateModel()" />
                  </base-tab-container-content>
                </template>

                <template #head="options">
                  <base-tab-container-content v-bind="options" title="Head">
                    <controls-font-options :value="model.columns[column].headOptions" @input="model.columns[column].headOptions = $event; updateModel()" />
                  </base-tab-container-content>
                </template>

                <template #foot="options">
                  <base-tab-container-content v-bind="options" title="Foot">
                    <controls-font-options :value="model.columns[column].footOptions" @input="model.columns[column].footOptions = $event; updateModel()" />
                  </base-tab-container-content>
                </template>
              </app-tab-container>
            </div>
          </base-tab-container-content>
        </template>
        <template #options="options">
          <base-tab-container-content v-bind="options" title="Options">
            <controls-image-options v-model="model.imageOptions" />
          </base-tab-container-content>
        </template>
      </app-tab-container>
    </template>
  </action-dialog>
</template>

<script>
import Papa from 'papaparse';
import { selectFiles } from '../../../utils/dom';
import ActionDialog from '../../controls/ActionDialog.vue';
import MixinDialog from '../../../mixins/Dialog.vue';
import AppTabContainer from '../../app/TabContainer.vue';
import BaseTabContainerContent from '../../base/tabContainer/Content.vue';

import ControlsImageOptions from '../ImageOptions.vue';
import ControlsFontOptions from '../FontOptions.vue';

import InputTextField from '../../inputs/TextField.vue';
import InputDropDown from '../../inputs/DropDown.vue';
import InputTextButton from '../../inputs/TextButton.vue';
import InputCheckBox from '../../inputs/CheckBox.vue';

import { DropDownOptionDescription } from '../../base/DropDown.vue';
import { getDefaultTableOptions, getDefaultTableColumnOptions, FONT_ALIGN } from '../../../utils/action';

export default {
  components: {
    AppTabContainer,
    BaseTabContainerContent,
    ActionDialog,
    InputTextField,
    InputDropDown,
    InputTextButton,
    InputCheckBox,
    ControlsImageOptions,
    ControlsFontOptions
  },
  mixins: [MixinDialog],
  inheritAttrs: false,
  props: {
    value: {
      type: Object,
      default () {
        return getDefaultTableOptions();
      }
    }
  },
  data () {
    const model = { ...this.value };
    model.columns = model.columns || this.createColumns(model.data[0]?.length || 0);
    return {
      model,
      column: null,
      label: 'Select align',
      options: [
        ['Left', FONT_ALIGN.LEFT],
        ['Center', FONT_ALIGN.CENTER],
        ['Right', FONT_ALIGN.RIGHT]
      ].map(([title, value]) => new DropDownOptionDescription({ title, value: String(value) }))

    };
  },
  computed: {
    columnOptions () {
      return [
        new DropDownOptionDescription({ title: 'Select Column', value: '' }),
        ...this.model.columns.map((v, index) => new DropDownOptionDescription({ title: `${index + 1}`, value: String(index) }))
      ];
    }
  },
  watch: {
    model: {
      handler () {
        this.$emit('input', this.model);
      },
      deep: true
    }
  },
  methods: {
    updateColumns (count) {
      this.model.columns = this.model.columns.slice(0, count);
      this.model.columns.push(...this.createColumns(count - this.model.columns.length));
    },
    createColumns (count) {
      return Array(count).fill({}).map(() => getDefaultTableColumnOptions());
    },
    updateModel (model = this.model) {
      this.model = { ...model };
      this.$emit('input', { ...model });
    },
    onClickAddRow () {
      this.model.data.push([]);
    },
    onClickDeleteRow (index) {
      this.model.data.splice(index, 1);
    },

    onClickReset () {
      this.model.data = [[]];
    },

    async onClickImportCsv () {
      try {
        const files = await selectFiles([]);
        if (files.length) {
          const { data } = await new Promise(resolve => {
            Papa.parse(files[0], {
              complete: result => resolve(result)
            });
          });
          this.model.data = data || [[]];
          this.updateColumns(this.model.data[0].length);
        }
      } catch (error) {
        this.$errorList.add(error);
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
.action-dialog-table {
  & .table-wrapper {
    width: 100%;
    overflow-x: scroll;
    overflow-y: inherit;
  }

  & table {
    padding: 0;
    margin: 0;
    border: none;

    & tr {
      &:first-child {
        & td:not(:last-child) {
          border-top: solid var(--color-primary-40) 1px;
          border-left: solid var(--color-primary-40) 1px;
        }
      }
    }

    & td {
      padding: 0;
      border: none;

      &:first-child {
        border-left: solid var(--color-primary-40) 1px;
      }

      &:not(:last-child) {
        border-right: solid var(--color-primary-40) 1px;
        border-bottom: solid var(--color-primary-40) 1px;
      }

      &:last-child {
        position: sticky;
        right: 0;
        padding-left: em(8);
        background: var(--color-secondary);
        border: solid black 1px;
      }

      &:not(.controls) {
        flex: 1;
      }

      & >>> button {
        background: var(--color-primary-20);
        border-color: transparent;
      }
    }
  }

  & .value {
    & >>> input {
      min-width: em(118, 12);
      background: var(--color-primary-20);
      border-color: transparent;
    }
  }

  & .buttons {
    display: flex;
    margin-top: em(4);

    & > * {
      flex: 1;
    }

    /* & > *{} */
  }
}
</style>
