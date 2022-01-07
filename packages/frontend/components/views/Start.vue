<template>
  <app-view class="view-start">
    <div>
      <h2>Welcome DevTerm User!</h2>
      <p v-if="'$server' in this">
        Do you work locally or remotely?
      </p>
      <p v-else>
        Your session does not support server, only available in remote.
      </p>
      <p>
        Click on "Use Remote" and enter the connection data <br>to connect to the DevTerm.
      </p>
      <div>
        <input-check-box v-model="remember" label="Remember choice" delimiter="?" />
      </div>

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

  & p {
    font-size: calc(12 /  16 * 1em);
    line-height: calc(20 / 12);
  }

  & div {
    text-align: center;
    margin: calc(20 /  16 * 1em);
  }

  & .buttons {
    & > * + * {
      margin-left: calc(16 / 16 * 1em);
    }
  }
}
</style>
