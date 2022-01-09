import EventEmitter from 'events';
import ACTION_DEFINITIONS from '../utils/action/definitions';
export default class Client extends EventEmitter {
  constructor () {
    super();
    this.socket = null;
    this.connected = false;
  }

  async connect (port = 3000, host = 'localhost', secure = false) {
    const protocol = secure ? 'wss' : 'ws';
    this.io = await this.ready();
    const socket = this.io(`${protocol}://${host}:${port}`, {
      // reconnectionDelayMax: 10000,
      autoConnect: false,
      reconnection: false,
      secure,
      transports: ['websocket']
    });
    this.socket = await new Promise((resolve, reject) => {
      socket.on('error', (error) => {
        this.emit('error', error);
      });
      socket.on('connect_error', (error) => {
        this.emit('error', error);
        reject(error);
      });
      socket.on('connect', () => {
        this.connected = socket.connected;
        this.emit('connect');
        resolve(socket);
      });
      socket.on('disconnect', () => {
        this.disconnect();
        this.emit('disconnect');
      });
      socket.connect();
    });
  }

  async ready () {
    if (this.io) {
      return this.io;
    }
    const { io } = await import('socket.io-client');
    this.io = io;
    return io;
  }

  get host () {
    return this.socket?.io?.opts?.hostname;
  }

  get port () {
    return (this.socket?.io?.opts?.port && Number(this.socket?.io?.opts?.port)) || undefined;
  }

  get secure () {
    return this.socket?.io?.opts?.secure;
  }

  promiseEmit (name, value) {
    return new Promise(resolve => {
      this.socket.emit(name, value, resolve);
    });
  }

  disconnect () {
    this.socket?.destroy();
    this.socket = null;
    this.connected = false;
  }

  async getInfo () {
    const value = await this.promiseEmit('getInfo');
    console.log('getInfo', value);
    return value;
  }

  async executeActions (actions) {
    // prepare
    actions = await Promise.all(actions.map(async action => 'beforePrinterCommand' in ACTION_DEFINITIONS[action.type] ? (await ACTION_DEFINITIONS[action.type].beforePrinterCommand(action)) : action));

    const value = await this.promiseEmit('executeActions', actions);
    console.log('executeActions', value);
  }
}
