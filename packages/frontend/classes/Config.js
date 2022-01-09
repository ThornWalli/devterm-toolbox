import {
  saveConfig, loadConfig,
  getVersion
} from '../utils/electron.js';
import { getDefaultConfig, getDefaultProfile } from '../utils/config.js';

export const DEFAULT_HOST = 'localhost';
export const DEFAULT_PROFILE = 'Profile Default';

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

  reset () {
    this.data = getDefaultConfig();
    return this.save();
  }

  async load () {
    let config;
    try {
      config = await loadConfig();
    } catch (error) {
      config = getDefaultConfig();
    }
    console.log(config);
    return (this.data = Object.assign(getDefaultConfig(), config));
  }

  saveProfile (options) {
    options.name = options.name || DEFAULT_PROFILE;
    const profiles = this.get('profiles');

    let profile = this.get('profiles').find(({ name }) => name === options.name);
    if (profile) {
      console.log('update profile', profile.name, profile);
      profiles[profiles.indexOf(profile)] = { ...profile, ...options };
    } else {
      console.log('create profile', profile.name, profile);
      profile = { ...getDefaultProfile(), ...options };
      profiles.push(profile);
    }
    this.set('profiles', profiles);
    return this.save();
  }

  deleteProfile (profileName) {
    const profiles = this.get('profiles');
    const profile = this.get('profiles').find(({ name }) => name === profileName);
    profiles.slice(profiles.indexOf(profile), 1);
    this.set('profiles', profiles);
    return this.save();
  }
};
