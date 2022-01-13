<template>
  <base-tab-container v-bind="$attrs" class="app-tab-container" transition-name="fade">
    <template v-for="(scopedSlot, name) in $scopedSlots" #[name]="options">
      <slot v-bind="{ ...options, ...(scopedSlot()[0].componentOptions || {}).propsData }" :name="name" />
    </template>
  </base-tab-container>
</template>

<script>
import BaseTabContainer from '../base/TabContainer.vue';
export default {
  components: {
    BaseTabContainer
  },
  inheritAttrs: false
};
</script>

<style lang="postcss" scoped>
.app-tab-container {
  & >>> .tabs {
    & > ul {
      display: flex;
      padding: 0;
      margin: 0;

      & > li {
        flex: 1;

        & span {
          display: block;
          padding: calc(8 / 12 * 1em);
          font-size: 12px;
          text-align: center;

          &.active {
            color: var(--color-secondary);
            background-color: var(--color-primary);
          }
        }
      }
    }
  }

  & >>> .tabs + div {
    margin-top: calc(8 / 16 * 1em);
  }

  & >>> .content {
    & > div {
      transition: height 0.3s, opacity 0.3s;
    }
  }

  &.js-animate {
    & >>> .content {
      & > div {
        opacity: 0;
      }
    }
  }
}

>>> .fade-enter-active,
>>> .fade-leave-active {
  transition: opacity 0.3s;
}

>>> .fade-enter,
>>> .fade-leave-to {
  opacity: 0;
}
</style>
