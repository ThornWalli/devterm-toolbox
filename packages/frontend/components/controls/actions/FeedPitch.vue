<template>
  <action-dialog title="Feed Pitch" class="action-dialog-feed-pitch" v-bind="$attrs" v-on="Object.assign({}, $listeners, {input:[]})">
    <template #head>
      <slot name="head" />
    </template>
    <template #default>
      <input-dropdown
        v-model="model.type"
        :label="'By'"
        :options="options"
      />
      <input-text-field
        :value="model.value"
        step="1"
        max="100"
        min="0"
        type="number"
        label="Value"
        @input="model.value = $event || 0"
      />
    </template>
  </action-dialog>
</template>

<script>
import ActionDialog from '../../controls/ActionDialog.vue';

import InputDropdown from '../../inputs/DropDown.vue';
import InputTextField from '../../inputs/TextField.vue';
import { DropDownOptionDescription } from '../../base/DropDown.vue';
import MixinDialog from '../../../mixins/Dialog.vue';
export default {
  components: { ActionDialog, InputDropdown, InputTextField },
  mixins: [MixinDialog],
  inheritAttrs: false,
  props: {
    value: {
      type: Object,
      default () {
        return {
          type: 'font',
          value: 0
        };
      }
    }
  },
  data () {
    return {
      label: 'Select align',
      options: [
        ['Pixel', 'pixel'],
        ['Font-Size', 'font']
      ].map(([title, value]) => new DropDownOptionDescription({ title, value })),
      model: { ...this.value }

    };
  },
  watch: {
    model: {
      handler () {
        this.$emit('input', this.model);
      },
      deep: true
    }
  }
};
</script>

<style lang="postcss" scoped>
.action-dialog-feed-pitch {
  /* empty */
}
</style>
