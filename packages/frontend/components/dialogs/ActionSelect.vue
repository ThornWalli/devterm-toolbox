<template>
  <app-dialog
    v-bind="$attrs"
    ref="dialog"
    :escape-close="true"
    title="Actions"
    class="dialog-action-select"
    v-on="$listeners"
  >
    <template #default>
      <fieldset v-for="(actions, title) in groupedActions" :key="title">
        <legend>{{ title }}</legend>
        <ul>
          <li v-for="action in actions" :key="action.title">
            <input-text-button color="primary" @click="onClick(action.value)">
              {{ action.title }}
            </input-text-button>
          </li>
        </ul>
      </fieldset>
    </template>
    <template #buttons>
      <input-text-button type="button" color="primary" text="Close" @click="close('close')" />
    </template>
  </app-dialog>
</template>

<script>
import { getActionTypes } from '../../utils/action';
import AppDialog from '../app/Dialog.vue';
import MixinDialog from '../../mixins/Dialog.vue';
import InputTextButton from '../inputs/TextButton.vue';

export default {
  components: {
    AppDialog, InputTextButton
  },
  mixins: [MixinDialog],
  inheritAttrs: false,

  props: {
    native: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    groupedActions () {
      return getActionTypes().filter(action => (this.native && action.native) || !action.native).reduce((result, action) => {
        (result[action.group] || (result[action.group] = [])).push(action);
        return result;
      }, {});
    }
  },

  methods: {
    onClick (value) {
      this.$emit('select', value);
      this.close();
    }
  }
};
</script>

<style lang="postcss" scoped>
.app-dialog.dialog-action-select {
  --dialog-width: 80%;

  & ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: em(0) 0;

    & li {
      box-sizing: border-box;
      display: flex;
      width: 50%;
      padding: em(4);

      & > * {
        flex: 1;
      }
    }
  }

  & fieldset {
    padding: em(0) em(0);
    margin: em(8) 0;

    /* margin: em(24, 16) 0; */
    border: solid  var(--color-primary);
    border-width: 1px 0 0;

    & legend {
      padding: 0 em(8);
      font-size: em(14);
      line-height: calc(20 / 14);
    }
  }
}
</style>
