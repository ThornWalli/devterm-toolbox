<template>
  <app-dialog
    v-bind="$attrs"
    ref="dialog"
    :escape-close="false"
    class="dialog-prompt"
    v-on="$listeners"
  >
    <template #default>
      <p>
        {{ message }}
      </p>
    </template>
    <template #buttons>
      <input-text-button color="secondary" :text="abortText" @click="callback(false); close()" />
      <input-text-button color="primary" :text="applyText" @click="callback(true); close()" />
    </template>
  </app-dialog>
</template>

<script>
import AppDialog from '../app/Dialog.vue';
import InputTextButton from '../inputs/TextButton.vue';
import MixinDialog from '../../mixins/Dialog.vue';

export default {
  components: {
    AppDialog,
    InputTextButton
  },
  mixins: [MixinDialog],
  inheritAttrs: false,
  props: {
    message: {
      type: String,
      default: 'Error Message'
    },
    callback: {
      type: Function,
      default: null
    },
    abortText: {
      type: String,
      default: 'No'
    },
    applyText: {
      type: String,
      default: 'Yes'
    }
  }
};
</script>

<style lang="postcss" scoped>
.app-dialog.dialog-prompt {
  --dialog-width: 40%;

  min-width: 300px;

  /* --color-primary: red;
  --dialog-width: em(480, 16); */

  & p {
    padding: em(8, 12) 0;
    margin: 0;
    font-size: em(12);
    text-align: center;
  }
}
</style>
