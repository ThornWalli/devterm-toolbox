/* eslint-disable no-unused-vars */

import { ALIGN, FONT, MAX_DENSITY } from 'devterm/config';
import devtermUri from './uris/devterm';

export const writeHeadline = (text) => {
  return [
    { type: 'reset' },
    { type: 'feedPitch', value: { value: 2, type: 'font' } },
    { type: 'setDensity', value: 15 },
    { type: 'text', value: text },
    { type: 'reset' },
    { type: 'feedPitch', value: { value: 2, type: 'font' } }];
};

export default [
  { type: 'reset' },
  { type: 'setAlign', value: ALIGN.CENTER },
  {
    type: 'barcode',
    value: {
      text: 'Devterm',
      options: {
        format: '',
        height: 100,
        font: 'monospace',
        textAlign: 'center',
        textPosition: 'bottom',
        textMargin: 2,
        fontSize: 20,
        margin: 10,
        displayValue: true,
        flat: false
      },
      imageOptions: {
        rotate: false,
        flipX: false,
        flipY: false,
        width: null
      }
    }
  },
  { type: 'feedPitch', value: { value: 2, type: 'font' } },
  {
    type: 'qrCode',
    value: {
      text: 'Devterm',
      options: {
        errorCorrectionLevel: 'M',
        margin: 0,
        scale: 4,
        small: false
      },
      imageOptions: {
        rotate: false,
        flipX: false,
        flipY: false,
        width: null
      }
    }
  },
  { type: 'feedPitch', value: { value: 2, type: 'font' } },
  {
    type: 'image',
    value: {
      file: devtermUri,
      imageOptions: {
        grayscale: true,
        rotate: false,
        flipX: false,
        flipY: false,
        width: 100
      }
    }
  },
  // { type: 'reset' },
  // { type: 'cutLine' },

  // { type: 'setFont', value: FONT.SIZE_8_16_THIN_1 },

  // ...writeHeadline('Text:'),
  // { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },

  // // { type: 'text', value: 'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },

  // { type: 'feedPitch', value: { value: 2, type: 'font' } },

  ...writeHeadline('Align:'),

  { type: 'setAlign', value: ALIGN.LEFT },
  { type: 'text', value: 'Left' },
  { type: 'setAlign', value: ALIGN.CENTER },
  { type: 'text', value: 'Center' },
  { type: 'setAlign', value: ALIGN.RIGHT },
  { type: 'text', value: 'Right' },
  { type: 'feedPitch', value: { value: 2, type: 'font' } },

  ...writeHeadline('Align with 1/3 Margin:'),

  { type: 'setMargin', value: 1 / 3 },
  { type: 'setAlign', value: ALIGN.LEFT },
  { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
  { type: 'feedPitch', value: { value: 1, type: 'font' } },
  { type: 'setAlign', value: ALIGN.CENTER },
  { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
  { type: 'feedPitch', value: { value: 1, type: 'font' } },
  { type: 'setAlign', value: ALIGN.RIGHT },
  { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },

  ...writeHeadline('Word Gap:'),
  ...Array(11).fill(0).map((v, index) => {
    return [
      { type: 'setWordGap', value: index },
      { type: 'text', value: `Word Gap ${index}px` }
    ];
  }).flat(),

  ...writeHeadline('Line Height:'),
  ...Array(10).fill(0).map((v, index) => {
    const value = 16 + index * 2;
    return [
      { type: 'setLineSpace', value },
      { type: 'text', value: `Line Space ${value}px` }
    ];
  }).flat(),

  ...writeHeadline('Density:'),
  ...Array(MAX_DENSITY).fill(0).map((v, index) => {
    return [
      { type: 'setDensity', value: index },
      { type: 'text', value: `Density ${index}` }
    ];
  }).flat(),
  { type: 'reset' },
  { type: 'feedPitch', value: { value: 14, type: 'font' } }

  // { type: 'setDensity', value: 15 },
  // { type: 'text', value: 'Test 1 2 3' },
  // { type: 'feedPitch', value: { value: 4, type: 'font' } },
  // // { type: 'reset' },
  // { type: 'cutLine' },
  // { type: 'feedPitch', value: { value: 2, type: 'font' } }
  // { type: 'setMargin', value: 1 / 3 },
  // { type: 'setAlign', value: ALIGN.LEFT },
  // { type: 'setAlign', value: ALIGN.CENTER },
  // { type: 'text', value: '' },
  // { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
  // { type: 'text', value: '' },
  // { type: 'setAlign', value: ALIGN.RIGHT },
  // { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' }

  // { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' }
  // { type: 'setAlign', value: ALIGN.CENTER },
  // { type: 'text', value: 'Test Text 2' },
  // { type: 'setAlign', value: ALIGN.RIGHT },
  // { type: 'text', value: 'Test Text 3' }
];
