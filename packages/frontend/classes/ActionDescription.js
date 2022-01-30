import { v4 as uuidv4 } from 'uuid';

export default class ActionDescription {
  constructor (options) {
    const { id, type, value, visible } = options || {};
    this.id = id || uuidv4();
    this.type = type;
    this.value = value;
    this.visible = visible === undefined ? true : visible;
    // this.timestamp = timestamp || Date.now();
  }

  toJSON () {
    return {
      id: this.id,
      type: this.type,
      value: this.value,
      visible: this.visible
    };
  }
}
