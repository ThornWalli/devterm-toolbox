
<template>
  <div class="actions" :class="{'action-active' : selectedAction,'drag' : isDrag}">
    <div ref="list" class="list">
      <div
        @dragover="allowDrop"
        @drop="onDrop"
      >
        <transition-group
          :name="!isDrag ? 'flip-list' : null"
          tag="ul"
        >
          <li
            v-for="(action, index) in model"
            :id="`anchor-action-item-${action.id}`"
            :key="action.id"
          >
            <action-item
              v-if="ACTION_DEFINITIONS[action.type]"
              :id="action.id"
              :property="ACTION_DEFINITIONS[action.type].property"
              :display="ACTION_DEFINITIONS[action.type].display(action.value)"
              :can-select="!!ACTION_DIALOGS[action.type]"
              :item-states="itemStates"
              :data-id="action.id"
              :draggable="!itemStates[action.id]"
              :focus="dragTargetId === action.id && action.id !== dragId"
              @select="onSelectAction(action.id)"
              @dragstart="onDragStart"
            >
              <template #default>
                <div class="action-controls">
                  <span class="index">{{ index + 1 }}</span>
                  <input-icon-button @click="onClickActionVisible(index)">
                    <svg-icon-visible v-if="action.visible" />
                    <svg-icon-invisible v-else />
                  </input-icon-button>
                  <input-icon-button @click="onClickActionUp(index)">
                    <svg-icon-arrow-up />
                  </input-icon-button>
                  <input-icon-button @click="onClickActionDown(index)">
                    <svg-icon-arrow-down />
                  </input-icon-button>
                  <input-icon-button @click="onClickActionDelete(index)">
                    <svg-icon-trash />
                  </input-icon-button>
                </div>
              </template>
            </action-item>
            <span v-else>
              Action {{ action.type }} not defined…
            </span>
          </li>
        </transition-group>
      </div>
    </div>
    <div class="add-action">
      <input-text-button color="primary" @click="showActionSelectDialog">
        Add Action
      </input-text-button>
    </div>
    <component
      :is="dialogComponent"
      v-if="selectedAction"
      ref="dialog"
      :colors="colors"
      :value="selectedAction.value"
      @input="updateAction(selectedAction, $event)"
      @ready="onReadyDialog"
      @close="onCloseDialog"
    />
    <dialog-action-select ref="dialogActionSelect" @select="onSelectAddAction" />
  </div>
</template>

<script>
import { fromEvent } from 'rxjs';
import ACTION_DEFINITIONS from '../utils/action/definitions';
import ACTION_DIALOGS from '../utils/action/dialogs';
import { getActionTypeOptions, createAction, getComponentByType } from '../utils/action';

import SvgIconArrowUp from '../assets/svg/icons/arrow-up.svg';
import SvgIconArrowDown from '../assets/svg/icons/arrow-down.svg';
import SvgIconTrash from '../assets/svg/icons/trash.svg';
import SvgIconVisible from '../assets/svg/icons/visible.svg';
import SvgIconInvisible from '../assets/svg/icons/invisible.svg';
import InputIconButton from './inputs/IconButton.vue';
import InputTextButton from './inputs/TextButton.vue';
import ActionItem from './controls/ActionItem.vue';

import DialogActionSelect from './dialogs/ActionSelect.vue';

export default {
  components: {
    SvgIconArrowUp,
    SvgIconArrowDown,
    SvgIconTrash,
    SvgIconVisible,
    SvgIconInvisible,
    InputIconButton,
    InputTextButton,
    ActionItem,
    DialogActionSelect
  },
  props: {
    value: {
      type: Array,
      default () {
        return [];
      }
    },
    colors: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      ACTION_DEFINITIONS,
      ACTION_DIALOGS,
      getComponentByType,
      selectedActionId: null,
      actionTypeOptions: getActionTypeOptions(),
      itemStates: {},
      isDrag: false,
      dragId: null,
      dragTargetId: null,
      model: [...this.value]
    };
  },
  computed: {
    selectedAction () {
      return this.model.find(action => action.id === this.selectedActionId);
    },
    dialogComponent () {
      return this.selectedAction && ACTION_DIALOGS[this.selectedAction.type];
    }
  },
  watch: {

    value (value) {
      this.model = [...value];
    },

    model: {
      handler (value) {
        this.itemStates = Object.fromEntries(value.map(({ id }) => [id, false]));
      },
      immediate: true
    },
    selectedAction (action, lastAction) {
      const itemStates = { ...this.itemStates };
      lastAction && (itemStates[lastAction.id] = false);
      action && (itemStates[action.id] = true);
      this.itemStates = itemStates;
      this.$emit('selectAction', action);
    }
  },
  mounted () {
    this.subscriptions = [fromEvent(window, 'dragenter').subscribe((e) => {
      if (e.target.closest('li [data-id]')) {
        const el = e.target.closest('li [data-id]');
        this.dragTargetId = el.dataset.id;
      }
    })];
  },
  destroyed () {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  },
  methods: {

    onSelectAddAction (selectedAction) {
      if (selectedAction) {
        const action = createAction(selectedAction);
        this.updateModel([].concat(this.model, action));
        this.$nextTick(() => {
          this.selectedActionId = null;
          const anchorEl = this.$refs.list.querySelector(`#anchor-action-item-${action.id}`);
          anchorEl && anchorEl.scrollIntoView({ block: 'center' });
          !!ACTION_DIALOGS[action.type] && window.setTimeout(() => {
            this.selectedActionId = action.id;
          }, 600);
        });
      }
    },
    showActionSelectDialog () {
      return this.$refs.dialogActionSelect.show();
    },
    onReadyDialog () {
      this.$nextTick(() => {
        this.$refs.dialog.show();
      });
    },
    onCloseDialog () {
      this.selectedActionId = null;
    },
    onSelectAction (id) {
      if (id) {
        this.selectedActionId = id;
      } else {
        this.selectedActionId = null;
      }
    },
    updateModel (model) {
      this.model = [...model];
      this.$emit('input', [...model]);
    },

    updateAction (action, value) {
      const actions = this.model;
      const index = actions.indexOf(action);
      actions[index] = {
        ...actions[index],
        value
        // timestamp: Date.now()
      };
      this.updateModel(actions);
    },

    onClickActionDelete (index) {
      const actions = [].concat(this.model);
      this.updateModel([...actions.slice(0, (index) || 0), ...actions.slice(index + 1)]);
    },
    onClickActionUp (index) {
      const actions = [].concat(this.model);
      const action = actions[Math.max(index - 1, 0)];
      actions[Math.max(index - 1, 0)] = actions[index];
      actions[index] = action;
      this.updateModel(actions);
    },
    onClickActionDown (index) {
      const actions = [].concat(this.model);
      const action = this.model[Math.min(index + 1, actions.length - 1)];
      actions[Math.min(index + 1, actions.length - 1)] = actions[index];
      actions[index] = action;
      this.updateModel(actions);
    },

    onClickActionVisible (index) {
      const action = this.model[index];
      const actions = this.model;
      actions[index] = {
        ...actions[index],
        visible: !action.visible
      };
      this.updateModel(actions);
    },

    onDragStart (e) {
      window.setTimeout(() => {
        this.dragId = e.target.dataset.id;
        this.isDrag = true;
      }, 100);
    },
    onDrop (e) {
      let actions = [].concat(this.model);
      const index = actions.indexOf(actions.find(action => action.id === this.dragTargetId));
      const dragIndex = actions.indexOf(actions.find(action => action.id === this.dragId));
      const action = actions.splice(dragIndex, 1);
      if (dragIndex > index) {
        actions = [...actions.slice(0, index + 1), ...action, ...actions.slice(index + 1)];
      } else {
        actions = [...actions.slice(0, index), ...action, ...actions.slice(index)];
      }

      this.dragId = null;
      this.dragTargetId = null;
      this.isDrag = false;
      this.updateModel(actions);
    },
    allowDrop (e) {
      e.preventDefault();
    }
  }
};
</script>

<style lang="postcss" scoped>
.actions {
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  padding: 0 calc(8 / 16 * 1em);
  user-select: none;

  --offset: calc(2 / 16 * 1em);

  & .list {
    height: calc(100% - (24px + 24px));
    overflow: auto;
  }

  & .add-action {
    flex: 0;
    height: calc(32 / 16 * 1em);
    margin: calc(16 / 16 * 1em) 0;
    margin-bottom: calc(8 / 16 * 1em);

    & > * {
      width: 100%;
    }
  }

  & ul {
    box-sizing: border-box;
    height: 100%;
    padding: 0;
    padding: calc(4 / 16 * 1em) 0;
    margin: 0;
    overflow: auto;
    list-style: none;
  }

  & li {
    display: block;
  }
}

.action-controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > * {
    padding: 0 calc(4 / 16 * 1em);
  }

  & .index {
    font-size: calc(13 / 16 * 1em);
    opacity: 0.6;
  }
}
</style>
