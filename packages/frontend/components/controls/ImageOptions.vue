<template>
  <div>
    <div class="cols">
      <div><input-check-box v-model="model.grayscale" label="Grayscale" /></div>
      <div><input-check-box v-model="model.rotate" label="Rotate" /></div>
      <div><input-check-box v-model="model.flipX" label="Flip X" /></div>
      <div><input-check-box v-model="model.flipY" label="Flip Y" /></div>
      <div><input-check-box v-model="model.invert" label="Invert" /></div>
    </div>
    <input-text-field
      v-model="model.width"
      type="number"
      min="1"
      step="1"
      label="width"
      placeholder="Size from Image (max. 384px)"
    />
  </div>
</template>

<script>
import { getDefaultPrepareOptions } from 'devterm/utils/canvas';

import InputCheckBox from '../inputs/CheckBox.vue';
import InputTextField from '../inputs/TextField.vue';

export default {

  components: {
    InputCheckBox,
    InputTextField
  },

  props: {
    value: {
      type: Object,
      default () {
        return getDefaultPrepareOptions();
      }
    }
  },
  data () {
    return {
      model: this.value
    };
  },
  watch: {
    model: {
      handler (model) {
        this.$emit('input', model);
      },
      deep: true
    }
  }
};
</script>
