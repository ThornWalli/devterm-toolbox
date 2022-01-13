<template>
  <app-dialog
    v-bind="$attrs"
    ref="dialog"
    :form="form"
    class="action-dialog"
    embed
    v-on="$listeners"
  >
    <template #default>
      <slot />
    </template>
    <template #buttons>
      <input-text-button :type="form ? 'submit' : 'button'" color="primary" text="Close" @click="$emit('close')" />
    </template>
  </app-dialog>
</template>

<script>
import InputTextButton from '../inputs/TextButton.vue';
import AppDialog from '../app/Dialog.vue';
import MixinDialog from '../../mixins/Dialog.vue';
export default {
  components: {
    InputTextButton,
    AppDialog
  },
  mixins: [MixinDialog],
  inheritAttrs: false,
  props: {
    form: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="postcss" scoped>
.action-dialog {
  /* empty */
}
</style>
