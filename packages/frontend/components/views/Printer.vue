<template>
  <app-view class="view-printer" :style="style">
    <div :key="JSON.stringify(colors)" class="printer-preview">
      <div>
        <div :class="{'has-selected': selectedAction}">
          <div v-for="(item, index) in previewItems" :id="`anchor-action-${item.id}`" :key="index" :class="{'selected' : selectedAction && selectedAction.id === item.id}">
            <component
              :is="item.component"
              :key="JSON.stringify(item.options)"
              v-bind="item.props"
              :options="item.options"
              :colors="colors"
            />
          </div>
        </div>
      </div>
      <input-text-button color="primary" class="print-button" @click="onClickPrint">
        Print
      </input-text-button>
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
    selectedAction (selectedAction) {
      if (selectedAction) {
        const anchorEl = document.querySelector(`#anchor-action-${selectedAction.id}`);
        this.$nextTick(() => {
          window.requestAnimationFrame(() => {
            anchorEl && anchorEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
          });
        });
      }
    }
  },
  mounted () {
    this.render();

    this.subscriptions = [
      keyUpObserver.pipe(filter(({ key }) => key === 'PrintScreen'))
        .subscribe((e) => this.print())
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
        this.renderTimeout = window.setTimeout(() => {
          this.previewItems = executeActions(this.actions);
          this.$nextTick(() => {
            this.loading = false;
          });
        }, 500);
      } else {
        this.previewItems = [];
      }
    },

    print () {
      return this.$client.executeActions(this.actions);
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
    width: 100%;
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

    & > div {
      flex: 1;

      /* height: 100%; */
      overflow: auto;

      & > div {
        width: 384px;
        padding: 0 calc(((58/50) * 384px - 384px) / 2);
        margin: 48px auto;
        color: var(--color-printer-preview-foreground);
        background: var(--color-printer-preview-background);

        /* border: dashed var(--color-primary-40); */
        border-width: 1px;
        box-shadow: 0 0 1em rgb(0 0 0 / 20%);

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
