<template>
  <action-dialog
    v-bind="$attrs"
    title="Text"
    class="action-dialog-native-text"
    form
    v-on="Object.assign({}, $listeners, {input:[]})"
    @submit="onSubmit"
  >
    <template #default>
      <input-text-box
        class="input"
        placeholder="Enter Text"
        :label="null"
        :value="value"
        rows="10"
        @input="onInput"
      />
      <div class="footer">
        <span>Rows: <span>{{ value.split('\n').length }}; Count: {{ value.length }}</span></span>
      </div>
    </template>
  </action-dialog>
</template>

<script>
import ActionDialog from '../../controls/ActionDialog.vue';
import InputTextBox from '../../inputs/TextBox.vue';
import MixinDialog from '../../../mixins/Dialog.vue';

export default {
  components: { ActionDialog, InputTextBox },
  mixins: [MixinDialog],
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput (e) {
      this.$emit('input', e);
    },
    onSubmit (e) {
      e.preventDefault();
      this.close();
    }
  }
};
</script>

<style lang="postcss" scoped>
.action-dialog-native-text {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  & .footer {
    padding-top: em(8px, 12);
    margin-top: em(8px, 12);
    font-size: em(12px);
    opacity: 0.6;
  }
}

</style>
