<template>
  <app-view class="view-start">
    <div>
      <h2>Welcome DevTerm User!</h2>
      <p>
        Do you work locally or remotely?
        <br>
        <br>
        <input-check-box v-model="remember" label="Remember choice" delimiter="?" />
      </p>

      <div class="buttons">
        <input-text-button v-if="'$server' in this" color="primary" text="Use Local" @click="onClickLocal" />
        <input-text-button color="primary" text="Use Remote" @click="onClickRemote" />
      </div>
    </div>
  </app-view>
</template>

<script>
import AppView from '../app/View.vue';
import InputTextButton from '../inputs/TextButton.vue';
import InputCheckBox from '../inputs/CheckBox.vue';
export default {
  components: {
    AppView,
    InputTextButton,
    InputCheckBox
  },
  data () {
    return { remember: false };
  },
  methods: {
    onClickLocal () {
      this.$emit('apply', {
        remember: this.remember,
        type: 'local'
      });
    },
    onClickRemote () {
      this.$emit('apply', {
        remember: this.remember,
        type: 'remote'
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
.view-start {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  & .buttons {
    & > * + * {
      margin-left: calc(16 / 16 * 1em);
    }
  }
}
</style>
