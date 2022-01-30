<template>
  <div class="base-tab-container" :class="{'js--animate': dimension}">
    <div v-if="(tabs.length && !hideSingleTab) || tabs.length > 1 && hideSingleTab" class="tabs">
      <ul>
        <li v-for="(tab, index) in tabs" :key="index">
          <label>
            <input :name="`tab-${_uid}`" type="radio" :value="tab.name" :checked="tab.name === currentTab.name" @input="onInput">
            <slot name="tab" v-bind="{...tab, active: tab.name === currentTab.name}"><span :class="{active: tab.name === currentTab.name}">{{ tab.title }}</span></slot>
          </label>
        </li>
      </ul>
    </div>
    <div class="content">
      <div ref="content" :style="contentStyle" @transitionend="onTransitionEnd">
        <transition
          :name="transitionName"
          :mode="transitionMode"
          @enter="enter"
        >
          <div :key="currentTab.name">
            <slot v-for="(tab) in visibleTabs" :name="tab.name" v-bind="{active: tab.name === currentTab.name}" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>

const IGNORED_SLOTS = ['tab'];

export default {
  props: {
    transitionName: {
      type: String,
      default: null
    },
    transitionMode: {
      type: String,
      default: 'out-in'
    },
    hideSingleTab: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedTab: null,
      dimension: null
    };
  },
  computed: {
    currentTab () {
      return this.selectedTab || this.tabs[0];
    },
    tabs () {
      return Object.keys(this.slots)
        .filter(name => !IGNORED_SLOTS.includes(name))
        .map((name) => {
          const slot = this.$scopedSlots[String(name)]()[0];
          return {
            name,
            title: getProperty(slot, 'title'),
            disabled: getProperty(slot, 'disabled')
          };
        }).filter(value => value).filter(value => !value.disabled);
    },
    visibleTabs () {
      return this.tabs.filter(tab => tab.name === this.currentTab.name);
    },

    contentStyle () {
      if (this.dimension) {
        return {
          height: `${this.dimension.height}px`
        };
      }
      return null;
    },
    slots () {
      return this.$scopedSlots;
    }
  },
  methods: {
    onInput (e) {
      this.dimension = this.$refs.content.children[0].getBoundingClientRect();
      this.selectedTab = this.tabs.find(tab => e.target.value === tab.name);
    },

    onTransitionEnd (e) {
      if (e.propertyName === 'height') {
        this.dimension = null;
        this.$emit('selectedTab', this.selectedTab);
      }
    },
    enter () {
      const { width, height } = this.$refs.content.children[0].getBoundingClientRect();
      if (this.dimension.width === width && this.dimension.height === height) {
        this.dimension = null;
      } else {
        this.dimension = { width, height };
      }
    }
  }
};

const getProperty = (slot, name) => {
  if (slot.componentOptions) {
    return slot.componentOptions.propsData[String(name)];
  } else if (slot.data && slot.data.attrs) {
    return slot.data.attrs[String(name)];
  } else {
    return null;
  }
};

</script>

<style lang="postcss" scoped>
.base-tab-container {
  display: flex;
  flex-direction: column;

  & .content {
    flex: 1;

    /* overflow: hidden; */

    & > div {
      transition: height 0.0001s; /* force transitionend */
    }
  }

  & .tabs {
    & ul {
      padding: 0;
      margin: 0;
      list-style: none;

      & li {
        & label {
          position: relative;
          cursor: pointer;

          & input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
            opacity: 0;
            appearance: none;
          }
        }
      }
    }
  }
}

</style>
