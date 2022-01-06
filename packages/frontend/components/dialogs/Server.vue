<template>
  <app-dialog
    ref="dialog"
    title="Server"
    class="dialog-server"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #default>
      <!-- {{ $server.addresses }} -->
      <base-input-label text="Status">
        <span class="status" :class="{active}">{{ active ? `listening on *:${$server.options.port}` : 'Offline' }}</span>
      </base-input-label>
      <base-input-label text="Active Sessions">
        <span>{{ $server.options.activeSessions }}</span>
      </base-input-label>
      <input-drop-down baseline-label size="5" readonly label="Active Hosts" :options="hostsOptions" />
      <input-text-field
        type="Number"
        label="Port"
        min="1024"
        step="1"
        :value="port"
        @input="port = parseInt($event)"
      />
      <input-check-box v-if="!active" v-model="autoConnect" label="Auto connect" />
    </template>
    <template #buttons>
      <input-text-button v-if="!active" color="primary" text="Start" @click="onClickStart" />
      <input-text-button v-else color="primary" text="Stop" @click="onClickStop" />
      <input-text-button color="secondary" text="Close" @click="close()" />
    </template>
  </app-dialog>
</template>

<script>
import { DropDownOptionDescription } from '../base/DropDown.vue';
import AppDialog from '../app/Dialog.vue';
import BaseInputLabel from '../base/InputLabel.vue';
import InputTextButton from '../inputs/TextButton.vue';
import InputTextField from '../inputs/TextField.vue';
import InputDropDown from '../inputs/DropDown.vue';
import InputCheckBox from '../inputs/CheckBox.vue';
import MixinDialog from '../../mixins/Dialog.vue';

export default {
  components: {
    AppDialog,
    BaseInputLabel,
    InputTextButton,
    InputTextField,
    InputDropDown,
    InputCheckBox
  },
  mixins: [MixinDialog],
  inheritAttrs: false,
  data () {
    return {
      host: 'localhost',
      port: 3000,
      refreshIntervalDuration: 3000,
      refreshInterval: null,
      autoConnect: true
    };
  },
  computed: {
    active () {
      return this.$server.options.active;
    },
    hostsOptions () {
      return this.$server.options.hosts.map(host => new DropDownOptionDescription(host));
    }
  },
  watch: {
    open (value) {
      this.toggleRefreshInterval(value);
    }
  },

  destroy () {
    this.toggleRefreshInterval(false);
  },
  methods: {
    toggleRefreshInterval (value) {
      if (value) {
        this.$server.refresh();
        this.refreshInterval = window.setInterval(() => {
          this.$server.refresh();
        }, this.refreshIntervalDuration);
      } else {
        window.clearInterval(this.refreshInterval);
      }
    },
    async onClickStart () {
      try {
        await this.$server.start(this.port);
        this.autoConnect && await this.$client.connect(this.port, this.$server.options.hosts[0]);
        this.autoConnect && this.close();
      } catch (error) {
        this.$errorList.add(error);
      }
    },
    async onClickStop () {
      try {
        await this.$server.stop();
      } catch (error) {
        this.$errorList.add(error);
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.dialog-server {
  --dialog-width: calc(480 / 16 * 1em);

  & >>> .base-input-label {
    display: flex;
  }

  & span {
    font-size: calc(12 / 16 * 1em);
    letter-spacing: 1px;
  }

  & .status {
    color: red;

    &.active {
      color: green;
    }
  }
}
</style>
