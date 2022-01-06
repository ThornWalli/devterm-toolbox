
import Vue from 'vue';
import { getServerOptions, startServer, stopServer } from '../utils/electron';

class ServerControl {
  constructor () {
    this.options = {
      active: false,
      hosts: [],
      port: null,
      activeSessions: 0
    };
  }

  async start (port) {
    const result = await startServer(port);
    if (result instanceof Error) {
      throw result;
    } else {
      await this.refresh();
    }
  }

  async stop () {
    await stopServer();
    await this.refresh();
  }

  async refresh () {
    serverControl.options = await getServerOptions();
  }
}

const serverControl = Vue.observable(new ServerControl());

Object.defineProperty(Vue.prototype, '$server', {
  get () {
    return serverControl;
  }
});
