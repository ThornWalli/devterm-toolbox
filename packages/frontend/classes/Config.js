import {
  saveConfig, loadConfig,
  getVersion
} from '../utils/electron.js';
import { getDefaultConfig } from '../utils/config.js';

export default class Config {
  constructor () {
    this.data = getDefaultConfig();
    this.version = null;
  }

  async init () {
    this.version = await getVersion();
  }

  toJSON () {
    return Object.assign({}, this.data, { version: this.version });
  }

  get (name) {
    return this.data[name];
  }

  set (name, value) {
    if (typeof name === 'string') {
      this.data[name] = value;
    } else if (typeof name === 'object') {
      Object.entries(name).forEach(([name, value]) => this.set(name, value));
    }
  }

  save () {
    return saveConfig(this.toJSON());
  }

  async load () {
    let config;
    try {
      config = await loadConfig();
    } catch (error) {
      config = getDefaultConfig();
    }
    return (this.data = Object.assign(getDefaultConfig(), config));
  }
};
