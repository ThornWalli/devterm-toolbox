<template>
  <div class="controls-action-item" :class="{'focus':focus || selected, property,'can-select': canSelect }" focusable v-on="$listeners">
    <base-generic-button class="title" @click="onClick">
      <span>{{ display.title }}{{ display.value?':':'' }}</span> <span v-if="display.value">{{ display.value }}</span>
    </base-generic-button>
    <div v-if="$slots.default">
      <slot />
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
  display: flex;

  & .title {
    display: block;
    flex: 1;
    padding: em(8px, 12) em(4px, 12);
    font-size: em(12px);
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

  & .title + div {
    display: flex;
    align-items: center;
  }

  &.property {
    & > .head {
      & .title {
        &::before {
          margin-right: em(4px, 12);
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
}
</style>
