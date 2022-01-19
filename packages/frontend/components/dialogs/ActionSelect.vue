<template>
  <app-dialog
    v-bind="$attrs"
    ref="dialog"
    :escape-close="true"
    title="Actions"
    class="dialog-actions"
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

  computed: {
    groupedActions () {
      return getActionTypes().reduce((result, action) => {
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
.dialog-actions {
  --dialog-width: calc(480 / 16 * 1em);

  & ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: calc(0 / 16 * 1em) 0;

    & li {
      box-sizing: border-box;
      display: flex;
      width: 50%;
      padding: calc(4 / 16 * 1em);

      & > * {
        flex: 1;
      }
    }
  }

  & fieldset {
    padding: calc(0 / 16 * 1em) calc(0 / 16 * 1em);
    margin: calc(8 / 16 * 1em) 0;

    /* margin: calc(24 / 16 * 1em) 0; */
    border: solid  var(--color-primary);
    border-width: 1px 0 0;

    & legend {
      padding: 0 calc(8 / 16 * 1em);
      font-size: calc(14 / 16 * 1em);
      line-height: calc(20 / 14);
    }
  }
}
</style>
