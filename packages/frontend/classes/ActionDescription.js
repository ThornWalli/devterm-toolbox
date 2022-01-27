import { v4 as uuidv4 } from 'uuid';

export default class ActionDescription {
  constructor (options) {
    console.log(options);
    const { id, type, value } = options || {};
    this.id = id || uuidv4();
    this.type = type;
    this.value = value;
    this.visible = true;
    // this.timestamp = timestamp || Date.now();
  }

  toJSON () {
    return {
      id: this.id,
      type: this.type,
      value: this.value,
      visible: true
    };
  }
}
