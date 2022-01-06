<template>
  <select :required="required" @change="$emit('input', $event.target.value)">
    <option v-for="option in singleOptions" :key="option.value" :value="option.value" :selected="option.value === preparedValue">
      {{ option.title }}
    </option>
    <optgroup v-for="group in groupedOptions" :key="group.label" :label="group.label">
      <option v-for="option in group.options" :key="option.value" :value="option.value" :selected="option.value === preparedValue">
        {{ option.title }}
      </option>
    </optgroup>
  </select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default () {
        return [1, 2, 3, 4];
      }
    },
    value: {
      type: [String, Number],
      default: null
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    preparedValue () {
      if (this.value === null) {
        return '';
      }
      return String(this.value);
    },
    preparedOptions () {
      return this.options.map((option) => {
        if (typeof option === 'object' && 'title' in option) {
          return DropDownOptionDescription.create(option);
        } else {
          return DropDownOptionDescription.create({
            value: option
          });
        }
      });
    },
    singleOptions () {
      return this.preparedOptions.filter(option => !option.group);
    },
    groupedOptions () {
      return Object.entries(this.preparedOptions.reduce((groups, option) => {
        if (option.group) {
          groups[option.group] = (groups[option.group] || []).concat(option);
        }
        return groups;
      }, {})).map(([name, groups]) => ({
        label: name,
        options: groups
      }));
    }
  }
};

export class DropDownOptionDescription {
  #value;
  #title;
  #group;

  constructor (data) {
    if (data && typeof data !== 'object') {
      data = { value: data };
    }

    const { value, title, group } = data || { value: '' };
    this.#value = value || '';
    this.#title = title || this.#value;
    this.#group = group;
  }

  get value () {
    return this.#value;
  }

  get title () {
    return this.#title;
  }

  get group () {
    return this.#group;
  }

  toJSON () {
    return {
      value: this.#value,
      title: this.#title,
      group: this.#group
    };
  }

  static create (...args) {
    return new this(...args);
  }
}

</script>
