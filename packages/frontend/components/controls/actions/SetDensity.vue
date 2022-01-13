<template>
  <action-dialog
    v-bind="$attrs"
    title="Set Density"
    class="action-set-density"
    form
    v-on="Object.assign({}, $listeners, {input:[]})"
    @submit="onSubmit"
  >
    <template #default>
      <input-dropdown :label="label" :options="options" :value="value" @input="$emit('input', $event)" />
    </template>
  </action-dialog>
</template>

<script>
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
      label: 'Set Density',
      options: Array(15).fill('').map((v, index) => new DropDownOptionDescription(String(index + 1)))
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
.action-set-density {
  /* empty */
}
</style>
