<template>
  <action-dialog v-bind="$attrs" title="Set Margin" class="action-set-margin" v-on="Object.assign({}, $listeners, {input:[]})">
    <template #default>
      <input-text-field
        step="0.01"
        max="1"
        min="0"
        type="number"
        :value="value"
        :label="label"
        @input="$emit('input', $event || 0)"
      />
    </template>
  </action-dialog>
</template>

<script>
import ActionDialog from '../../controls/ActionDialog.vue';
import MixinDialog from '../../../mixins/Dialog.vue';

import InputTextField from '../../inputs/TextField.vue';
export default {
  components: { ActionDialog, InputTextField },
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
      label: 'Set Margin'
    };
  }
};
</script>

<style lang="postcss" scoped>
.action-set-margin {
  /* empty */
}
</style>
