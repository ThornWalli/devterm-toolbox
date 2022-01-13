<template>
  <action-dialog
    v-bind="$attrs"
    title="Set Align"
    class="action-dialog-set-align"
    form
    v-on="Object.assign({}, $listeners, {input:[]})"
    @submit="onSubmit"
  >
    <template #default>
      <input-dropdown :label="label" :value="String(value)" :options="options" @input="$emit('input', Number($event))" />
    </template>
  </action-dialog>
</template>

<script>
import { ALIGN } from 'devterm/config';

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
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
      label: 'Select align',
      options: [
        ['Left', ALIGN.LEFT],
        ['Center', ALIGN.CENTER],
        ['Right', ALIGN.RIGHT]
      ].map(([title, value]) => new DropDownOptionDescription({ title, value: String(value) }))

    };
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
.action-dialog-set-align {
  /* empty */
}
</style>
