
import Vue from 'vue';
import Client from '../classes/Client';
import errorList from './error';

const client = Vue.observable(new Client());
client.on('error', (error) => {
  errorList.add(error);
});

Object.defineProperty(Vue.prototype, '$client', {
  get () {
    return client;
  }
});
