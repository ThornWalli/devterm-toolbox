<template>
  <app-dialog
    ref="dialog"
    title="Remote"
    class="dialog-remote"
    :class="{connected}"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #default>
      <base-input-label text="Connection">
        <span>{{ connected ? `Connected with ${$client.host}:${$client.port}` : 'Disconnected' }}</span>
      </base-input-label>
      <input-text-field v-model="host" label="Host" placeholder="Enter host…" />
      <input-text-field
        type="Number"
        label="Port"
        min="1024"
        step="1"
        :value="port"
        @input="port = parseInt($event)"
      />
    </template>
    <template #buttons>
      <input-text-button v-if="!connected" color="primary" text="Connect" @click="onClickConnect" />
      <input-text-button v-else color="primary" text="Disconnect" @click="onClickDisconnect" />
      <input-text-button color="secondary" text="Close" @click="close()" />
    </template>
  </app-dialog>
</template>

<script>
import AppDialog from '../app/Dialog.vue';
import BaseInputLabel from '../base/InputLabel.vue';
import InputTextButton from '../inputs/TextButton.vue';
import InputTextField from '../inputs/TextField.vue';
import MixinDialog from '../../mixins/Dialog.vue';

export default {
  components: {
    AppDialog,
    BaseInputLabel,
    InputTextButton,
    InputTextField
  },
  mixins: [MixinDialog],
  inheritAttrs: false,
  data () {
    return {
      host: 'localhost',
      port: 3000
    };
  },
  computed: {
    connected () {
      return this.$client.connected;
    }
  },
  methods: {
    async onClickConnect () {
      try {
        await this.$client.connect(this.port, this.host);
        this.close();
      } catch (error) {
        console.error(error);
      }
    },
    async onClickDisconnect () {
      try {
        await this.$client.disconnect();
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.dialog-remote {
  --dialog-width: calc(480 / 16 * 1em);

  & span {
    font-size: calc(12 / 16 * 1em);
    color: red;
    letter-spacing: 1px;
  }

  &.connected {
    & span {
      color: green;
    }
  }
}
</style>
