<template>
  <app-view class="view-start">
    <div>
      <h2>Welcome DevTerm User!</h2>
      <p v-if="!$server.disabled">
        Do you work locally or remotely?
      </p>
      <p v-else>
        Your session does not support server, only available in remote.
      </p>
      <p v-if="https">
        <strong style="text-decoration: underline;">Note the protocol of this page.</strong> <br>
        Only if a SSL certificate of the target DevTerm is installed, https can be used.<br>
        Use the http variant instead: <a href="http://devterm.lammpee.de">http://devterm.lammpee.de</a>
      </p>
      <p>
        Click on "Use Remote" and enter the connection data <br>to connect to the DevTerm.
      </p>
      <div class="buttons">
        <input-text-button v-if="!$server.disabled" color="primary" text="Use Local" @click="onClickLocal" />
        <input-text-button color="primary" text="Use Remote" @click="onClickRemote" />
      </div>
    </div>
  </app-view>
</template>

<script>

import AppView from '../app/View.vue';
import InputTextButton from '../inputs/TextButton.vue';

export default {
  components: {
    AppView,
    InputTextButton
  },
  data () {
    return {
      https: window.location.protocol.startsWith('https')
    };
  },
  methods: {
    onClickLocal () {
      this.$emit('apply', {
        type: 'local'
      });
    },
    onClickRemote () {
      this.$emit('apply', {
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
    font-size: calc(12 / 16 * 1em);
    line-height: calc(20 / 12);
  }

  & a {
    color: currentColor;
  }

  & div {
    margin: calc(20 / 16 * 1em);
    text-align: center;
  }

  & .buttons {
    & > * + * {
      margin-left: calc(16 / 16 * 1em);
    }
  }
}
</style>
