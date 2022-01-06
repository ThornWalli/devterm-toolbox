
import Vue from 'vue';
import Config from '../classes/Config';

const config = Vue.observable(new Config());

Object.defineProperty(Vue.prototype, '$config', {
  get () {
    return config;
  }
});
