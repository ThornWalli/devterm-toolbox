
import Vue from 'vue';
import { getServerOptions, startServer, stopServer, serverSupported } from '../utils/electron';

class ServerControl {
  constructor () {
    this.disabled = false;
    this.options = {
      active: false,
      hosts: [],
      port: null,
      activeSessions: 0
    };
  }

  async init () {
    this.disabled = !(await serverSupported());
  }

  async start (port, ssl) {
    const result = await startServer(port, ssl);
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
