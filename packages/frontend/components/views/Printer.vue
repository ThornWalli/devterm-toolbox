<template>
  <app-view class="view-printer" :style="style">
    <div :key="JSON.stringify(colors)" class="printer-preview">
      <div class="scroll" :class="{loading}">
        <div :class="{'has-selected': selectedAction}">
          <div v-for="item in previewItems" :id="`anchor-action-${item.id}`" :key="item.id" :class="{'selected' : selectedAction && selectedAction.id === item.id}">
            <component
              v-bind="item.props"
              :is="item.component"
              :key="item.id"
              :options="item.options"
              :colors="colors"
              @ready="item.resolve()"
            />
          </div>
        </div>
      </div>
      <div class="buttons">
        <input-text-button color="primary" class="print-button" @click="onClickPrint">
          Print
        </input-text-button>
      </div>
      <transition name="fade">
        <div v-if="loading" class="layer-loading">
          Loading
        </div>
      </transition>
    </div>
    <actions
      v-model="actions"
      class="printer-actions"
      :colors="colors"
      @selectAction="selectedAction = $event"
    />
    <div v-if="actions.length < 1" class="actions-empty">
      Add a Action!
    </div>
  </app-view>
</template>

<script>
import { filter } from 'rxjs/operators';
import AppView from '../app/View.vue';
import InputIconButton from '../inputs/IconButton.vue';
import InputTextButton from '../inputs/TextButton.vue';
import InputDropDown from '../inputs/DropDown.vue';
import Actions from '../Actions.vue';
import { executeActions } from '../../utils/action';
import { keyUpObserver } from '../../utils/dom';

export default {
  components: {
    AppView,
    InputIconButton,
    InputTextButton,
    InputDropDown,
    Actions
  },

  props: {
    colors: {
      type: Object,
      default () {
        return {
          primary: [255, 204, 0],
          secondary: [0, 0, 0],
          printer: {
            preview: {
              background: [0, 0, 0],
              foreground: [255, 204, 0]
            }
          }
        };
      }
    },
    value: {
      type: Array,
      default () {
        return [];
      }
    }
  },

  data () {
    return {
      actions: [].concat(this.value),
      previewItems: [],
      loading: true,
      selectedAction: null
    };
  },
  computed: {
    style () {
      return {
        '--color-printer-preview-background': `rgb(${this.colors.printer.preview.background.join(',')})`,
        '--color-printer-preview-foreground': `rgb(${this.colors.printer.preview.foreground.join(',')})`
      };
    }
  },
  watch: {
    value (value) {
      this.actions = value;
    },
    actions () {
      this.render();
      this.$emit('input', this.actions);
    },
    selectedAction (value) {
      if (value) {
        this.scrollToAction(value);
      }
    }
  },
  mounted () {
    this.render();

    this.subscriptions = [
      keyUpObserver.pipe(filter(({ key }) => key === 'PrintScreen'))
        .subscribe(() => this.print())
    ];
  },
  destroyed () {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  },

  methods: {

    render () {
      if (this.actions.length) {
        this.loading = true;
        window.clearTimeout(this.renderTimeout);
        this.renderTimeout = window.setTimeout(async () => {
          const ready = [];
          this.previewItems = await executeActions(this.actions).map(action => {
            ready.push(new Promise(resolve => {
              action.resolve = () => resolve();
            }));
            return action;
          });
          await Promise.all(ready);
          this.$nextTick(() => {
            this.loading = false;
            if (this.selectedAction) {
              this.scrollToAction(this.selectedAction);
            }
          });
        }, 500);
      } else {
        this.previewItems = [];
      }
    },

    print () {
      return this.$client.executeActions(this.actions);
    },

    scrollToAction (action) {
      this.$nextTick(() => {
        window.requestAnimationFrame(() => {
          const anchorEl = document.querySelector(`#anchor-action-${action.id}`);
          anchorEl && anchorEl.scrollIntoView({ block: 'center' });
        });
      });
    },

    onClickPrint () {
      this.print();
    }

  }

};

</script>

<style lang="postcss" scoped>
@import "@devterm-toolbox/frontend/assets/css/transitions.pcss";

.view-printer {
  display: flex;

  & .actions-empty {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    pointer-events: none;
  }

  & .print-button {
    margin: calc(8 / 12 * 1em);
  }

  & .printer-preview {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;

    &::before {
      --padding: calc((58/50) * 384px - 384px);
      --width: 384px;

      position: absolute;
      top: calc(8 / 16 * 1em);
      bottom: 0;
      left: calc(50% - ((var(--width) + var(--padding)) / 2));
      display: block;
      width: calc(var(--width) + var(--padding));
      content: "";
      background: var(--color-printer-preview-background);
    }

    & > .buttons {
      position: relative;
      display: flex;
      width: 100%;
      background: var(--color-printer-preview-foreground);

      & > * {
        flex: 1;
      }
    }

    & > .scroll {
      position: relative;
      top: calc(8 / 16 * 1em);
      flex: 1;
      overflow: auto;
      transition: opacity 0.2s;
      &.loading {
        opacity: 0;
      }

      & > div {
        position: relative;
        width: 384px;
        padding: 0 calc(var(--padding) / 2);
        margin: 48px auto;
        color: var(--color-printer-preview-foreground);
        background: var(--color-printer-preview-background);
        border: dotted var(--color-secondary-30);
        border-width: 1px;

        &.has-selected {
          & > div {
            opacity: 0.4;

            &.selected {
              opacity: 1;
            }
          }
        }
      }
    }
  }

  & .layer-loading {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 80%);
    transition: opacity 0.3s 1s;

    &::after {
      display: inline-block;
      content: "";
      animation: loading;
      animation-duration: 4s;
      animation-iteration-count: infinite;
    }
  }
}

@keyframes loading {
  0% {
    content: "";
  }

  25% {
    content: ".";
  }

  50% {
    content: "..";
  }

  75% {
    content: "...";
  }
}

</style>
