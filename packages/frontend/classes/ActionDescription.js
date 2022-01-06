import { v4 as uuidv4 } from 'uuid';

export default class ActionDescription {
  constructor (options) {
    const { type, value } = options || {};
    this.id = uuidv4();
    this.type = type;
    this.value = value;
    // this.timestamp = timestamp || Date.now();
  }

  toJSON () {
    return {
      id: this.id,
      type: this.type,
      value: this.value
    };
  }
}
