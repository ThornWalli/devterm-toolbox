
import Vue from 'vue';

class DialogControl {
  constructor () {
    this.prompts = [];
  }

  prompt (message, title) {
    return new Promise(resolve => {
      const options = { title, message };
      const callback = (value) => {
        this.prompts.slice(this.prompts.indexOf(options), 1);
        resolve(value);
      };
      options.callback = callback;
      this.prompts.push(options);
    });
  }
}
const dialogControl = Vue.observable(new DialogControl());

Object.defineProperty(Vue.prototype, '$dialog', {
  get () {
    return dialogControl;
  }
});

export default dialogControl;
