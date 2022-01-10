<template>
  <app-dialog
    v-bind="$attrs"
    ref="dialog"
    title="Remote"
    class="dialog-remote"
    :class="{connected}"
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
      <base-input-label text="Connection">
        <span>{{ connected ? `Connected with ${$client.host}:${$client.port}` : 'Disconnected' }}</span>
      </base-input-label>
      <input-check-box v-model="secure" label="SSL" />
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
      <input-text-button v-if="!connected" color="primary" type="submit" text="Connect" />
      <input-text-button v-else color="primary" text="Disconnect" @click="onClickDisconnect" />
      <input-text-button color="secondary" text="Close" @click="close()" />
    </template>
  </app-dialog>
</template>

<script>
import { DEFAULT_HOST, DEFAULT_PROFILE } from '../../classes/Config';
import { getDefaultProfile } from '../../utils/config';
import { DropDownOptionDescription } from '../base/DropDown.vue';
import AppDialog from '../app/Dialog.vue';
import BaseInputLabel from '../base/InputLabel.vue';
import InputCheckBox from '../inputs/CheckBox.vue';
import InputTextButton from '../inputs/TextButton.vue';
import InputTextField from '../inputs/TextField.vue';
import InputDropDown from '../inputs/DropDown.vue';
import MixinDialog from '../../mixins/Dialog.vue';

export default {
  components: {
    AppDialog,
    BaseInputLabel,
    InputCheckBox,
    InputTextButton,
    InputTextField,
    InputDropDown
  },
  mixins: [MixinDialog],
  inheritAttrs: false,
  props: {
    remeber: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      host: 'localhost',
      port: 3000,
      secure: window.location.protocol.startsWith('https'),
      selectedProfile: null,
      profileName: DEFAULT_PROFILE
    };
  },
  computed: {
    connected () {
      return this.$client.connected;
    },
    profileOptions () {
      return [{ title: 'Select Profile…', value: '' }, ...this.$config.get('profiles')].map(profile => new DropDownOptionDescription(profile.name || profile));
    }
  },
  watch: {
    selectedProfile (value, lastValue) {
      if (value !== lastValue) {
        const profile = this.$config.get('profiles').find(({ name }) => name === value) || getDefaultProfile();
        const {
          name,
          port,
          host,
          secure
        } = profile;
        this.profileName = name;
        this.port = port;
        this.host = host || DEFAULT_HOST;
        this.secure = secure || false;
      }
    }
  },
  methods: {
    async onSubmit (e) {
      e.preventDefault();
      try {
        await this.$client.connect(this.port, this.host, this.secure);
        await this.$config.saveProfile({ name: this.profileName, port: this.port, host: this.host, secure: this.secure });
        this.close({ profile: this.profileName });
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
    },

    async onClickDeleteProfile () {
      await this.$config.deleteProfile(this.selectedProfile);
      this.selectedProfile = null;
    }
  }
};
</script>

<style lang="postcss" scoped>
.dialog-remote {
  --dialog-width: calc(480 / 16 * 1em);

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

  & .profile-name {
    display: flex;
    margin-top: calc(8 / 16 * 1em);

    & > :first-child {
      flex: 1;
    }
  }

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
