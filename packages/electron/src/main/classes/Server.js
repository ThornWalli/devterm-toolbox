const http = require('http');
const https = require('https');
const fs = require('fs');
const Events = require('events');
const { Server: SocketIoServer } = require('socket.io');
const { SERIAL_PORT_IN } = require('devterm/utils/devterm');

const { createPrinter, getThermalPrinterTemperature, getTemperatures, isDevTermA06, getBattery } = require('devterm');
const { getNetworkAddresses } = require('../utils/network');
const { ACTION_PRINTER_COMMANDS } = require('../utils/action');

const isDev = process.env.NODE_ENV === 'development';

const hasPrinterSerialPort = async () => {
  try {
    await fs.promises.access(SERIAL_PORT_IN, fs.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

const DEFAULT_PORT = (process.env.DEVTERM_TOOLBOX_PORT || 3000);
class Server extends Events {
  constructor () {
    super();
    this.debug = isDev;
    this.disabled = false;
    this.active = false;
    this.port = DEFAULT_PORT;
    this.ssl = {
      key: null,
      cert: null,
      pfx: null,
      passphrase: null
    };
    this.sockets = new Map();
    this.printer = createPrinter();

    this.printer.debug = true;
  }

  get hosts () {
    return getNetworkAddresses();
  }

  get secure () {
    return Object.entries(this.ssl).filter(([, v]) => Boolean(v)).length > 0;
  }

  toJSON () {
    return {
      debug: this.debug,
      disabled: this.disabled,
      port: this.port,
      active: true
    };
  }

  async createServer () {
    if ((this.ssl.key && this.ssl.cert) || this.ssl.pfx) {
      // resolve certifacte paths
      const options = Object.fromEntries(await Promise.all(Object.entries(this.ssl).filter(([, v]) => Boolean(v)).map(async ([key, value]) => value && ([key, await fs.promises.readFile(value)]))));
      this.server = https.createServer(options);
    } else {
      this.server = http.createServer();
    }
    this.io = new SocketIoServer(this.server);
    this.io.on('connection', this.onIoConnection.bind(this));
  }

  supported () {
    return this.debug || hasPrinterSerialPort();
  }

  async start (port, ssl) {
    this.ssl = { ...this.ssl, ...ssl };
    await this.createServer();
    this.disabled = !await hasPrinterSerialPort();
    port = port || 3000;
    if (this.disabled) {
      console.log('Printer not found, serivce is disabled!');
      if (!this.debug) {
        return this;
      }
    }
    return new Promise((resolve, reject) => {
      this.port = port || this.port;
      this.server.listen(port, async () => {
        try {
          if (!this.disabled && !this.printer.connected) { await this.printer.connect(); }
          this.active = true;
          console.log(`listening on \`*:${port}\`${Object.entries(this.ssl).filter(([, v]) => Boolean(v)).length && ' (ssl)'}`);
          this.emit('start', this);
          resolve(this);
        } catch (error) {
          this.io.emit('error', error);
          this.emit('error', error);
          reject(error);
        }
      });
    });
  }

  async stop () {
    console.log('server stop');
    await new Promise(resolve => (this.io && this.io.close(resolve)) || resolve());
    this.active = false;
    this.sockets = new Map();
    this.emit('stop');
  }

  registerEvents (socket) {
    socket.on('executeActions', onSocketExecuteActions(this.printer, this.disabled));
    socket.on('getInfo', onSocketGetInfo(this.io));
    // #####
    socket.on('disconnect', (a) => {
      this.sockets.delete(socket.id);
      console.log('user disconnected', a);
    });
  }

  onIoConnection = (socket) => {
    this.sockets.set(socket.id, socket);
    console.log(`a user connected \`${socket.id}\``);
    this.registerEvents(socket);
  };
};

const onSocketExecuteActions = (printer, disabled) => async (actions) => {
  // prepare actions
  const preparedActions = actions.map(action => {
    if (action.type in ACTION_PRINTER_COMMANDS) {
      return (printer) => ACTION_PRINTER_COMMANDS[action.type](printer, action.value);
    }
    console.warn(`no printer command found for \`${action.type}\``);
    return null;
  }).filter(Boolean);

  if (disabled) {
    console.log('Printer not found, serivce is disabled!');
  } else {
    await preparedActions.reduce((result, command) => result.then(() => command(printer)), Promise.resolve());
  }
  console.log(`execute ${preparedActions.length} actions…`);
  return true;
};

const onSocketGetInfo = io => async (value, reply) => {
  try {
    reply({
      printerTemperature: await getThermalPrinterTemperature(),
      temperatures: await getTemperatures(),
      type: await isDevTermA06() ? 'A06' : '',
      battery: await getBattery()
    });
  } catch (error) {
    console.log(error.message);
    io.emit('error', error);
  }
};

module.exports = {
  default: Server,
  createPrinter,
  hasPrinterSerialPort
};
