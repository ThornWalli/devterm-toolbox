
<template>
  <div class="app" :style="style" :class="{ready}">
    <app-menu class="header">
      <component v-bind="item.props" :is="item.component" v-for="(item, index) in headerItems" :key="index" v-on="item.on" />
    </app-menu>
    <div class="app-content">
      <view-start v-if="!$client.connected && ready" @apply="onApplyViewStart" />
      <view-printer v-else-if="currentView === VIEWS.PRINTER" v-model="printerTemplate" :colors="colors" />
      <view-info v-else-if="currentView === VIEWS.INFO" />
    </div>
    <app-menu class="footer">
      <component v-bind="item.props" :is="item.component" v-for="(item, index) in footerItems" :key="index" v-on="item.on" />
    </app-menu>
    <dialog-error v-for="(error,index) in $errorList.errors" v-bind="error" :key="index" init-open />
    <dialog-prompt v-for="(prompt,index) in $dialog.prompts" v-bind="prompt" :key="index" init-open />
    <dialog-remote v-if="ready" ref="dialogRemote" />
    <dialog-server v-if="ready" ref="dialogServer" />
    <dialog-options v-if="ready" ref="dialogOptions" />
  </div>
</template>
<script>

import {
  isElectron,

  minimizeWindow,
  maximizeWindow,
  fullscreenWindow,
  closeWindow,

  templateSave,
  templateLoad,

  listenFullscreenChange,
  listenDialogOpen

} from '../utils/electron';

import { loadFonts } from '../utils/font';
import ActionDescription from '../classes/ActionDescription';

import testData from '../data/test';
import AppMenu from './app/Menu.vue';
import AppMenuItem from './app/MenuItem.vue';
import AppMenuText from './app/MenuText.vue';
import AppMenuSpacer from './app/MenuSpacer.vue';
import AppMenuDivider from './app/MenuDivider.vue';

const VIEWS = {
  NONE: null,
  INFO: 'info',
  START: 'start',
  PRINTER: 'priner'
};

const THEMES = {
  amber: {
    primary: [255, 204, 0],
    secondary: [0, 0, 0],
    printer: {
      preview: {
        background: [255, 204, 0],
        foreground: [0, 0, 0]
      }
    }
  },
  green: {
    primary: [51, 255, 0],
    secondary: [0, 0, 0],
    printer: {
      preview: {
        background: [51, 255, 0],
        foreground: [0, 0, 0]
      }
    }
  },
  whiteBlack: {
    primary: [255, 255, 255],
    secondary: [0, 0, 0],
    printer: {
      preview: {
        background: [255, 255, 255],
        foreground: [0, 0, 0]
      }
    }
  },
  blackWhite: {
    primary: [0, 0, 0],
    secondary: [255, 255, 255],
    printer: {
      preview: {
        background: [0, 0, 0],
        foreground: [255, 255, 255]
      }
    }
  }
};

function exampleData () {
  return testData.map(data => new ActionDescription(data));
}

export default {
  components: {

    ViewPrinter: () => import('./views/Printer.vue'),
    ViewStart: () => import('./views/Start.vue'),
    ViewInfo: () => import('./views/Info.vue'),
    AppMenu,
    AppMenuItem,
    AppMenuText,
    AppMenuSpacer,
    AppMenuDivider,
    DialogError: () => import('./dialogs/Error.vue'),
    DialogRemote: () => import('./dialogs/Remote.vue'),
    DialogServer: () => import('./dialogs/Server.vue'),
    DialogOptions: () => import('./dialogs/Options.vue'),
    DialogPrompt: () => import('./dialogs/Prompt.vue')
  },

  data () {
    return {
      VIEWS,

      currentView: VIEWS.PRINTER,

      ready: false,
      fullscreen: false,
      printerTemplate: exampleData()
    };
  },

  computed: {

    headerItems () {
      const printerItems = [
        {
          component: AppMenuItem,
          on: {
            click: this.onClickNew
          },
          props: { text: 'New' }
        },
        {
          component: AppMenuDivider
        },
        {
          component: AppMenuItem,
          on: {
            click: this.onClickSave
          },
          props: { text: 'Save' }
        },
        {
          component: AppMenuItem,
          title: 'Load',
          on: {
            click: this.onClickLoad
          },
          props: { text: 'Load' }
        },
        {
          component: AppMenuDivider
        }
      ];

      return [
        ...((this.$client.connected && [{
          component: AppMenuItem,
          on: {
            click: () => (this.currentView = VIEWS.INFO)
          },
          props: { selected: this.currentView === VIEWS.INFO, text: 'Info' }
        },
        {
          component: AppMenuItem,
          on: {
            click: () => (this.currentView = VIEWS.PRINTER)
          },
          props: { selected: this.currentView === VIEWS.PRINTER, text: 'Printer' }
        }]) || []),
        {
          component: AppMenuSpacer
        },
        ...((this.$client.connected && this.currentView === VIEWS.PRINTER && printerItems) || []),

        {
          component: AppMenuItem,
          on: {
            click: this.onClickOptions
          },
          props: { text: 'Options' }
        },
        isElectron() && [{
          component: AppMenuDivider
        }, {
          component: AppMenuItem,
          on: {
            click: this.onClickClose
          },
          props: { text: 'Close' }
        }]

      ].flat().filter(Boolean);
    },

    footerItems () {
      return [
        isElectron() && [{
          component: AppMenuItem,
          on: {
            click: this.onClickMinimizeWindow
          },
          props: { text: 'Minimize' }
        }, {
          component: AppMenuItem,
          on: {
            click: this.onClickMaximizeWindow
          },
          props: { text: 'Maximize' }
        }].flat(),
        {
          component: AppMenuItem,
          on: {
            click: this.onClickFullscreen
          },
          props: { selected: this.fullscreen, text: 'Fullscreen' }
        },
        {
          component: AppMenuSpacer
        },
        this.hasServer && [{
          component: AppMenuText,
          on: {
            click: this.showServerDialog
          },
          props: { class: { connection: true, connected: this.$server.options.active }, text: `${this.$server.options.active ? `Server (*:${this.$server.options.port}${this.$server.options.secure ? '/SSL' : ''})` : 'Server Offline'}` }
        },
        {
          component: AppMenuDivider
        }],
        {
          component: AppMenuText,
          on: {
            click: this.showRemoteDialog
          },
          props: { class: { connection: true, connected: this.clientConnected }, text: `${this.clientConnected ? `Online (${this.$client.host}:${this.$client.port}${this.$client.secure ? '/SSL' : ''})` : 'Offline'}` }
        },
        {
          component: AppMenuDivider
        },
        {
          component: AppMenuText,
          on: {
            click: () => { window.open('https://github.com/ThornWalli/devterm-toolbox/releases'); }
          },
          props: { class: 'info-version', text: this.version }
        }

      ].flat().filter(Boolean);
    },

    hasServer () {
      return !this.$server.disabled;
    },

    version () {
      return this.$config.version;
    },
    colors () {
      return THEMES[this.$config.data.theme];
    },
    clientConnected () {
      return this.$client.connected;
    },
    style () {
      return {
        '--color-primary': `rgb(${this.colors.primary.join(',')})`,
        '--color-secondary': `rgb(${this.colors.secondary.join(',')})`,
        ...Object.fromEntries(Array(10).fill('').map((v, i) => [`--color-primary-${(i + 1) * 10}`, `rgb(${this.colors.primary.join(' ')} / ${(i + 1) * 10}%)`])),
        ...Object.fromEntries(Array(10).fill('').map((v, i) => [`--color-secondary-${(i + 1) * 10}`, `rgb(${this.colors.secondary.join(' ')} / ${(i + 1) * 10}%)`]))
      };
    }
  },

  async  mounted () {
    await loadFonts();

    await this.$config.init();
    await this.$server.init();

    this.hasServer && await this.$server.refresh();
    await this.$config.load();

    const profile = this.$config.get('profiles').find(({ name }) => name === this.$config.get('profile'));

    if (profile) {
      const { port, host, ssl, secure } = profile;

      if (this.$config.get('startType') && port) {
        try {
          if (this.$server && this.$config.get('startType') === 'local' && !this.$server.options.active) {
            await this.$server.start(port, ssl);
          }
          if (host) {
            await this.$client.connect(port, host, secure);
          }
        } catch (error) {
        }
      }
    }
    this.ready = true;
    this.registerListeners();
  },
  methods: {

    registerListeners () {
      listenFullscreenChange(value => {
        this.fullscreen = value;
      });
      listenDialogOpen((type, value) => {
        switch (type) {
          case 'open':
            switch (value) {
              case 'options':
                this.showOptionsDialog();
                break;
              case 'remote':
                this.showRemoteDialog();
                break;
              case 'server':
                this.showServerDialog();
                break;

              default:
                break;
            }
            break;

          default:
            break;
        }
      });
    },

    onClickMinimizeWindow () {
      return minimizeWindow();
    },
    onClickMaximizeWindow () {
      return maximizeWindow();
    },

    onClickFullscreen () {
      return fullscreenWindow(!this.fullscreen);
    },

    onClickClose () {
      return closeWindow();
    },

    onClickNew () {
      this.printerTemplate = [];
    },

    onClickSave () {
      return templateSave(this.printerTemplate);
    },

    async onClickLoad () {
      try {
        const template = await templateLoad();
        if (template) {
          this.printerTemplate = template;
        }
      } catch (error) {
        this.$errorList.add(error);
      }
    },
    onClickOptions () {
      this.showOptionsDialog();
    },

    async onApplyViewStart ({ type }) {
      this.$config.set('startType', type);

      let options = {};
      switch (type) {
        case 'local':
          options = await this.showServerDialog();
          break;
        case 'remote':
          options = await this.showRemoteDialog();
          break;
      }

      const { profile } = options || {};
      if (profile) {
        this.$config.set('profile', profile);
        await this.$config.save();
      }
    },
    showServerDialog () {
      return this.$refs.dialogServer.show();
    },
    showRemoteDialog () {
      return this.$refs.dialogRemote.show();
    },
    showOptionsDialog () {
      return this.$refs.dialogOptions.show();
    }

  }
};

</script>

<style lang="postcss" scoped>
@import "../assets/css/transitions.pcss";

.header-drag {
  width: 100%;
  height: 100%;
  cursor: grab;
  background: var(--color-secondary);
  border: none;
  outline: none;
  appearance: none;
  -webkit-app-region: drag;

  &:active {
    cursor: grabbing;
  }
}

.connection {
  color: red;

  &.connected {
    color: green;
  }
}

.info-version {
  font-style: italic;
}

.app {
  position: relative;
  display: flex;
  flex-direction: column;

  /* min-width: 1280px; */

  /* height: 480px; */
  width: 100%;
  height: 100%;
  font-family: monospace;
  color: var(--color-primary);
  user-select: none;
  background: var(--color-secondary);
  opacity: 0;
  transition: opacity 0.6s ease-in;

  &.ready {
    opacity: 1;
  }

  & > .header {
    border-bottom: solid var(--color-primary) calc(2 / 16 * 1em);
  }

  & > .footer {
    border-top: solid var(--color-primary) calc(2 / 16 * 1em);
  }

  & > .header,
  & > .footer {
    height: calc(22 / 16 * 1em);
  }

  & > .app-content {
    position: relative;
    display: flex;
    flex-direction: column;
    height: calc(100% - ((24 ) / 16 * 1em) * 2);
    overflow: auto;

    & > div:first-child {
      height: 100%;

      /* height: calc(100% - ((32 + 8) / 16 * 1em) * 1); */
    }

    /* - (4 / 16 * 1em) */
  }

  & >>> .preview {
    transition: opacity 0.2s;
  }
}
</style>

<style lang="postcss">
::-webkit-scrollbar {
  width: calc(16 / 16 * 1em);
}

::-webkit-scrollbar-thumb {
  background-color: var(--color-primary);
  border: solid  var(--color-secondary) calc(2 / 16 * 1em);
  outline: none;
}

:root {
  --color-background: #000;
}
::-webkit-scrollbar-corner { background: transparent; }

html,
body {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  font-size: 16px;
  background: var(--color-background);
}

strong {
  font-weight: bold;
}

hr {
  margin: calc(8 / 16 * 1em) 0;
  border-color: var(--color-primary);
  border-width: 1px 0 0;
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.5s;
}

.list-enter,
.list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.flip-list-move {
  transition: transform 0.6s;
}
</style>
