<template>
  <div class="controls-action-item" :class="{'focus':focus || selected, property,'can-select': canSelect }" focusable v-on="$listeners">
    <div class="head">
      <base-generic-button class="title" @click="onClick">
        <span>{{ display.title }}{{ display.value?':':'' }}</span>
        <span v-if="display.value">{{ display.value }}</span>
      </base-generic-button>
      <div v-if="$slots.head">
        <slot name="head" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseGenericButton from '../base/GenericButton.vue';
export default {
  components: {
    BaseGenericButton
  },

  props: {
    itemStates: {
      type: Object,
      default () {
        return { id: false };
      }
    },
    canSelect: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: 'id'
    },
    focus: {
      type: Boolean,
      default: false
    },
    property: {
      type: Boolean,
      default: false
    },
    display: {
      type: Object,
      default () {
        return {
          title: 'Action Item',
          value: 'Action Item Value'
        };
      }
    }
  },
  computed: {
    selected () {
      return this.itemStates[this.id];
    }
  },
  methods: {

    onClick () {
      if (this.canSelect) {
        this.$emit('select', this.id);
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.controls-action-item {
  display: block;

  /* opacity: 0.6;

  &:hover,
  &:focus {
    opacity: 1;
  } */

  & > .head {
    display: flex;
    align-items: center;

    & .title {
      display: block;
      flex: 1;
      padding: calc(8 / 12 * 1em) calc(4 / 12 * 1em);
      font-size: calc(12 / 16 * 1em);
      text-align: left;
      opacity: 0.6;

      /* transition: opacity 0.2s, background 1s ease-out; */

      &:hover,
      &:focus {
        opacity: 1;

        /* transition: opacity 0.2s, background 0.3s ease-in, color 0s 0.15s; */
      }

      & > span {
        &:nth-child(2) {
          font-style: italic;
          opacity: 0.6;
        }
      }
    }
  }

  &.property {
    & > .head {
      & .title {
        &::before {
          margin-right: calc(4 / 12 * 1em);
          content: "»";
        }

        font-style: italic;
        opacity: 0.4;
      }
    }
  }

  &.can-select {
    & > .head {
      & .title {
        cursor: pointer;

        &:hover,
        &:focus {
          color: var(--color-secondary);
          background: var(--color-primary);
          opacity: 1;
        }
      }
    }
  }

  &.focus {
    & > .head {
      color: var(--color-secondary);
      background: var(--color-primary);
    }

    opacity: 1;
  }

  & > .content {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;

    & > span {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgb(0 0 0 / 50%);
    }

    & > div {
      position: relative;
      box-sizing: border-box;
      width: 80%;
      padding: calc(8 / 16 * 1em);
      padding-top: calc(8 / 16 * 1em);
      margin-top: calc(8 / 16 * 1em);
      background: var(--color-secondary);
      border: solid var(--color-primary) 1px;
    }
  }
}
</style>
