<template>
  <dialog v-if="open" class="app-dialog" :class="{embed}">
    <span @click="close()" />
    <div v-if="title" class="dialog-title">
      {{ title }}
    </div>
    <component :is="form? 'form' : 'div'" class="dialog-content" @submit="$emit('submit', $event)">
      <div>
        <slot>Dialog Content</slot>
      </div>
      <div v-if="$slots.buttons" class="buttons">
        <slot name="buttons" />
      </div>
    </component>
  </dialog>
</template>

<script>
import { filter } from 'rxjs/operators';
import { keyUpObserver } from '../../utils/dom';
export default {
  inheritAttrs: true,
  props: {
    embed: {
      type: Boolean,
      default: false
    },
    escapeClose: {
      type: Boolean,
      default: true
    },
    initOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    form: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      open: false,
      subscriptions: []
    };
  },
  watch: {
    open (value) {
      if (value) {
        this.subscriptions = [keyUpObserver.pipe(filter(({ key }) => key === 'Escape' && this.escapeClose)).subscribe((e) => {
          this.close();
        })];
      } else {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
      }
    }
  },
  mounted () {
    this.$emit('ready');
    if (this.initOpen) {
      this.$nextTick(() => {
        this.show();
      });
    }
  },
  destroyed () {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  },
  methods: {
    show () {
      return new Promise(resolve => {
        this.open = true;
        this.$nextTick(() => {
          if (this.embed) {
            this.$el.show();
          } else {
            this.$el.showModal();
          }
          this.$emit('open');
          this.$once('close', resolve);
        });
      });
    },
    close (value) {
      this.open = false;
      this.$el.close(value);
      this.$emit('close', value);
    }
  }
};
</script>

<style lang="postcss" scoped>
.app-dialog {
  --dialog-width: 80%;

  display: none;
  padding: 0;
  background: transparent;
  border: none;
  appearance: none;

  &::backdrop {
    background: rgb(0 0 0 / 50%);
  }

  &[open] {
    display: flex;
    flex-direction: column;

    &.embed {

      & > span {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: "";
        background: rgb(0 0 0 / 50%);
      }
    }
  }

  & > div,
  & > form {
    position: relative;
    box-sizing: border-box;
    padding: calc(8 / 16 * 1em);
    padding-top: calc(8 / 16 * 1em);
    color: var(--color-primary);
    background: var(--color-secondary);
    border: solid var(--color-primary) 1px;
  }

  & .dialog-title {
    font-size: calc(12 / 16 * 1em);
    line-height: 1;
    color: var(--color-secondary);
    text-align: center;
    background: var(--color-primary);
  }

  & .dialog-content {
    max-height: 100%;
    overflow: auto;

    & > .buttons {
      display: flex;
      margin: calc(-8 / 16 * 1em);
      margin-top: calc(8 / 16 * 1em);

      & > * {
        flex: 1;
      }
    }

    & > div,
    & > form {
      & > .buttons {
        display: flex;
        margin: calc(8 / 16 * 1em) calc(-8 / 16 * 1em);

        & > * {
          flex: 1;
          margin: 0 calc(8 / 12 * 1em);
        }
      }
    }
  }

  &:not(.embed) {
    width: var(--dialog-width);
  }

  &.embed {
    position: absolute;
    top: 0;
    right: 0;
    left: auto;
    z-index: 10;
    align-items: center;
    justify-content: center;
    width: 50%;

    /* width: 100%; */
    height: 100%;

    & > div,
    & > form {
      width: var(--dialog-width);
      max-height: 100%;
      overflow: auto;
    }
  }

  /* ####### */
  & >>> .base-input-label {
    display: flex;
  }

  & >>> .cols {
    display: flex;
    flex-wrap: wrap;

    & > hr {
      flex: 1;
    }

    & > div {
      box-sizing: border-box;
      width: 50%;
      padding: calc(4 / 16 * 1em);
    }

    margin: calc(8 / 16 * 1em) calc(-4 / 16 * 1em);

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.61, 1, 0.88, 1);
}

.component-fade-enter,
.component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
