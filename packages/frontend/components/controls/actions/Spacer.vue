<template>
  <action-dialog
    v-bind="$attrs"
    title="Spacer"
    class="action-dialog-spacer"
    form
    v-on="Object.assign({}, $listeners, {input:[]})"
    @submit="onSubmit"
  >
    <template #default>
      <input-text-field
        :value="model.value"
        step="1"
        min="0"
        type="number"
        label="Value"
        @input="model.value = Math.abs(parseInt($event || 0))"
      />
    </template>
  </action-dialog>
</template>

<script>
import ActionDialog from '../../controls/ActionDialog.vue';

import InputTextField from '../../inputs/TextField.vue';
import MixinDialog from '../../../mixins/Dialog.vue';
export default {
  components: { ActionDialog, InputTextField },
  mixins: [MixinDialog],
  inheritAttrs: false,
  props: {
    value: {
      type: Object,
      default () {
        return {
          value: 0
        };
      }
    }
  },
  data () {
    return {
      label: 'Select align',
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
.action-dialog-spacer {
  /* empty */
}
</style>
