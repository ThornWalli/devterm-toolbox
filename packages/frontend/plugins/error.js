
import Vue from 'vue';

class ErrorList {
  constructor () {
    this.errors = [];
  }

  add (message, title) {
    if (typeof message === 'object') {
      console.error(message);
      message.type && (title = message.type);
      message = message.message;
    }
    const error = { title, message };
    const callback = () => {
      this.errors.slice(this.errors.indexOf(error), 1);
    };
    error.callback = callback;
    this.errors.push(error);
  }
}
const errorList = Vue.observable(new ErrorList());

Object.defineProperty(Vue.prototype, '$errorList', {
  get () {
    return errorList;
  }
});

export default errorList;
