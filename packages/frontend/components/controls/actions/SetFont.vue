<template>
  <action-dialog title="Set Font" class="action-dialog-set-font" v-bind="$attrs" v-on="Object.assign({}, $listeners, {input:[]})">
    <template #head>
      <slot name="head" />
    </template>
    <template #default>
      <input-dropdown :label="label" :options="options" :value="String(value)" @input="$emit('input', $event)" />
    </template>
  </action-dialog>
</template>

<script>
import { FONT } from 'devterm/config';

import ActionDialog from '../../controls/ActionDialog.vue';
import MixinDialog from '../../../mixins/Dialog.vue';

import InputDropdown from '../../inputs/DropDown.vue';
import { DropDownOptionDescription } from '../../base/DropDown.vue';
export default {
  components: { ActionDialog, InputDropdown },
  mixins: [MixinDialog],
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: 0
    }
  },
  data () {
    return {
      label: 'Select font',
      options: Object.keys(FONT).map((value) => new DropDownOptionDescription({ title: value, value: String(FONT[value]) }))
    };
  }
};
</script>

<style lang="postcss" scoped>
.action-dialog-set-font {
  /* empty */
}
</style>
