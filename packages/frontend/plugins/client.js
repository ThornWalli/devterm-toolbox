
import Vue from 'vue';
import { registerClient } from '../utils/electron';
import Client from '../classes/Client';
import errorList from './error';

const client = Vue.observable(new Client());

registerClient(client);

client.on('error', (error) => {
  errorList.add(error);
});

Object.defineProperty(Vue.prototype, '$client', {
  get () {
    return client;
  }
});
