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
    <div class="display-look" />
  </dialog>
</template>

<script>
import { filter } from 'rxjs/operators';
import { keyUpObserver } from '../../utils/dom';

const openedDialogs = [];

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
          if (openedDialogs[openedDialogs.length - 1] === this) {
            this.close();
          }
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
        openedDialogs.push(this);
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

      openedDialogs.splice(openedDialogs.indexOf(this), 1);

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

  & .dialog-title,
  & .dialog-content {
    position: relative;
    box-sizing: border-box;
    padding: em(8);
    padding-top: em(8);
    color: var(--color-primary);
    background: var(--color-secondary);
    border: solid var(--color-primary) 1px;
  }

  & .dialog-title {
    font-size: em(12);
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
      margin-top: em(8);

      & > * {
        flex: 1;
      }
    }

    & > div,
    & > form {
      & > .buttons {
        display: flex;
        margin: em(8) calc(-8 / 16 * 1em);

        & > * {
          flex: 1;
          margin: 0 em(8, 12);
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

    & > .dialog-title,
    & > .dialog-content {
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
      padding: em(4);
    }

    margin: em(8) em(-4px);

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

<style lang="postcss" scoped>
.display-look {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    pointer-events: none;
    content: " ";
    background: linear-gradient(transparent 50%, rgb(0 0 0 / 25%) 50%), linear-gradient(90deg, rgb(255 0 0 / 6%), rgb(0 255 0 / 2%), rgb(0 0 255 / 6%));
    background-size: 100% 2px, 3px 100%;
    opacity: 0.6;
  }
}
</style>
