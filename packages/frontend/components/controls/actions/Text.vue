<template>
  <action-dialog v-bind="$attrs" title="Text" class="action-dialog-text" v-on="Object.assign({}, $listeners, {input:[]})">
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
  data () {
    return {
      label: 'Select align'
    };
  },
  methods: {
    onInput (e) {
      this.$emit('input', e);
    }
  }
};
</script>

<style lang="postcss" scoped>
.action-dialog-text {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  & .footer {
    padding-top: calc(8 / 16 * 1em);
    margin-top: calc(8 / 16 * 1em);
    font-size: calc(12 / 16 * 1em);
    opacity: 0.6;
  }
}

</style>
