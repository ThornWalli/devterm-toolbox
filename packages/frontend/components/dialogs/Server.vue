<template>
  <app-dialog
    v-bind="$attrs"
    ref="dialog"
    title="Server"
    class="dialog-server"
    form
    v-on="$listeners"
    @submit="onSubmit"
  >
    <template #default>
      <div class="profile-select">
        <input-drop-down v-model="selectedProfile" baseline-label label="Profile" :options="profileOptions" />
        <input-text-button color="primary" :disabled="!selectedProfile" text="Delete" @click="onClickDeleteProfile" />
      </div>
      <input-text-field v-model="profileName" label="Profile Name" />
      <hr>
      <base-tab-container class="tab-container">
        <template #general="options">
          <base-tab-container-content v-bind="options" title="General">
            <div class="cols">
              <div>
                <base-input-label text="Status">
                  <span class="status" :class="{active}">{{ active ? `listening on *:${$server.options.port}` : 'Offline' }}</span>
                </base-input-label>
              </div>
              <div>
                <base-input-label text="Active Sessions">
                  <span>{{ $server.options.activeSessions }}</span>
                </base-input-label>
              </div>
            </div>
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
          </base-tab-container-content>
        </template>
        <template #ssl="options">
          <base-tab-container-content v-bind="options" title="SSL">
            <input-file-select label="Key" :accept="['.key', '.pem']" :value="ssl.key" @input="ssl.key = $event.path" />
            <input-file-select label="Cert" :accept="['.cert','.crt', '.pem']" :value="ssl.cert" @input="ssl.cert = $event.path" />
            <input-file-select label="PFX" :accept="['.pfx']" :value="ssl.pfx" @input="ssl.pfx = $event.path" />
            <input-text-field v-model="ssl.passphrase" label="Passphrase" />
          </base-tab-container-content>
        </template>
      </base-tab-container>
    </template>
    <template #buttons>
      <input-text-button v-if="!active" type="submit" color="primary" text="Start" />
      <input-text-button v-else color="primary" text="Stop" @click="onClickStop" />
      <input-text-button color="secondary" text="Close" @click="close()" />
    </template>
  </app-dialog>
</template>

<script>
import { DropDownOptionDescription } from '../base/DropDown.vue';
import AppDialog from '../app/Dialog.vue';
import BaseInputLabel from '../base/InputLabel.vue';
import BaseTabContainer from '../base/TabContainer.vue';
import BaseTabContainerContent from '../base/tabContainer/Content.vue';
import InputTextButton from '../inputs/TextButton.vue';
import InputTextField from '../inputs/TextField.vue';
import InputFileSelect from '../inputs/FileSelect.vue';
import InputDropDown from '../inputs/DropDown.vue';
import InputCheckBox from '../inputs/CheckBox.vue';
import MixinDialog from '../../mixins/Dialog.vue';

export default {
  components: {
    AppDialog,
    BaseInputLabel,
    BaseTabContainer,
    BaseTabContainerContent,
    InputTextButton,
    InputTextField,
    InputDropDown,
    InputCheckBox,
    InputFileSelect
  },
  mixins: [MixinDialog],
  inheritAttrs: false,
  data () {
    return {
      host: 'localhost',
      port: 3000,
      refreshIntervalDuration: 3000,
      refreshInterval: null,
      autoConnect: true,
      ssl: {
        key: null,
        cert: null,
        pfx: null,
        passphrase: null
      },
      selectedProfile: null,
      profileName: null
    };
  },
  computed: {
    active () {
      return this.$server.options.active;
    },
    profileOptions () {
      return [{ title: 'Select Profile…', value: '' }, ...this.$config.get('profiles')].map(profile => new DropDownOptionDescription(profile.name || profile));
    },
    hostsOptions () {
      return this.$server.options.hosts.map(host => new DropDownOptionDescription(host));
    }
  },
  watch: {
    selectedProfile (value, lastValue) {
      if (value !== lastValue) {
        const {
          name,
          port,
          ssl
        } = this.$config.get('profiles').find(({ name }) => name === value);
        this.profileName = name;
        this.port = port;
        this.ssl = { ...ssl };
      }
    },
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
    async onSubmit (e) {
      e.preventDefault();
      try {
        await this.$server.start(this.port, this.ssl);
        const secure = Object.values(this.ssl).find(Boolean);
        this.autoConnect && await this.$client.connect(this.port, this.$server.options.hosts[0], secure);
        await this.$config.saveProfile({ name: this.profileName, port: this.port, ssl: { ...this.ssl } });
        return this.close({
          profile: this.profileName
        });
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
    },

    async onClickDeleteProfile () {
      await this.$config.deleteProfile(this.selectedProfile);
      this.selectedProfile = null;
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

  & .profile-select {
    display: flex;
    margin-bottom: calc(8 / 16 * 1em);

    & > * {
      flex: 1;

      &:last-child {
        flex: 0;
      }
    }
  }

  & .tab-container {
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
  }
}
</style>
