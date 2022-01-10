
import Vue from 'vue';

Object.defineProperty(Vue.prototype, '$server', {
  get () {
    return {
      init () {
        return Promise.resolve();
      },
      disabled: true
    };
  }
});
