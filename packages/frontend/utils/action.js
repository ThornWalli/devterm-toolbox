
import { DEFAULT_DENSITY, ALIGN, FONT, getDefaultConfig, MAX_PIXELS_FONT } from 'devterm/config';
import { getDefaultPrepareOptions } from 'devterm/utils/canvas';

import { DropDownOptionDescription } from '../components/base/DropDown.vue';

import ActionDescription from '../classes/ActionDescription';

export const getActionTypes = () => {
  return [
    { native: true, title: 'Align (native)', value: 'setAlign', group: 'Layout' },
    { native: true, title: 'Margin (native)', value: 'setMargin', group: 'Layout' },
    { native: true, title: 'Font (native)', value: 'setFont', group: 'Layout' },
    { native: true, title: 'LineSpace (native)', value: 'setLineSpace', group: 'Layout' },
    { native: true, title: 'WordGap (native)', value: 'setWordGap', group: 'Layout' },
    { native: false, title: 'Grid', value: 'grid', group: 'Layout' },
    { native: false, title: 'Image', value: 'image', group: 'Content' },
    { native: false, title: 'QRCode', value: 'qrCode', group: 'Content' },
    { native: false, title: 'Barcode', value: 'barcode', group: 'Content' },
    { native: false, title: 'Text', value: 'text', group: 'Content' },
    { native: true, title: 'Text (native)', value: 'nativeText', group: 'Content' },
    { native: true, title: 'Reset (native)', value: 'reset', group: 'General' },
    { native: true, title: 'Feed Pitch (native)', value: 'feedPitch', group: 'General' },
    { native: true, title: 'Cutline (native)', value: 'cutLine', group: 'General' },
    { native: true, title: 'Density (native)', value: 'setDensity', group: 'General' }
  ];
};

export const getActionTypeOptions = () => {
  return [
    new DropDownOptionDescription({ title: 'Add new Action…', value: '' }),
    ...getActionTypes().map(actionType => new DropDownOptionDescription(actionType))
  ];
};

/**
 * Create Action Description with default value
 * @param String type
 * @returns ActionDescription
 */
export const createAction = (type) => {
  let value;
  switch (type) {
    case 'setLineSpace':
      value = 0;
      break;
    case 'setWordGap':
      value = 0;
      break;
    case 'setMargin':
      value = 0;
      break;
    case 'setDensity':
      value = 1;
      break;
    case 'setFont':
      value = FONT.SIZE_8_16_THIN_1;
      break;
    case 'setAlign':
      value = ALIGN.LEFT;
      break;
    case 'feedPitch':
      value = { value: 1, type: 'font' };
      break;
    case 'text':
      value = getDefaultTextOptions();
      break;
    case 'nativeText':
      value = 'Text';
      break;
    case 'grid':
      value = getDefaultGridOptions();
      break;
    case 'image':
      value = getDefaultImageOptions();
      break;
    case 'qrCode':
      value = getDefaultQRCodeOptions();
      break;
    case 'barcode':
      value = getDefaultBarcodeOptions();
      break;
    default:
      break;
  }
  return new ActionDescription({ type, value });
};

export const executeActions = (actions) => {
  const options = getDefaultConfig();
  return actions.filter(action => action.visible).map(action => executeAction(action, options)).filter(Boolean);
};

const getCutLine = (font) => {
  return Array(MAX_PIXELS_FONT[font]).fill('').map((v, i) => {
    if (i % 2 === 0) {
      return '=';
    } else {
      return '-';
    }
  }).join('');
};

export const executeAction = (action, options) => {
  switch (action.type) {
    case 'setMargin':
      options.margin = action.value;
      break;

    case 'setAlign':
      options.align = action.value;
      break;

    case 'setLineSpace':
      options.lineSpace = action.value;
      break;

    case 'setWordGap':
      options.wordGap = action.value;
      break;

    case 'setFont':
      options.font = Number(action.value);
      break;

    case 'setDensity':
      options.density = Number(action.value);
      break;

    case 'reset':
      Object.assign(options, getDefaultConfig());
      break;

    case 'cutLine':
      return {
        id: action.id,
        component: () => import('../components/preview/NativeText.vue'),
        options: {
          ...options,
          // reset options
          margin: 0,
          wordGap: 0,
          lineSpace: 0,
          density: DEFAULT_DENSITY
        },
        props: {
          value: getCutLine(options.font)
        }
      };

    case 'grid':
      return {
        id: action.id,
        component: () => import('../components/preview/GridCanvas.vue'),
        options: { ...options },
        props: { ...action }
      };

    case 'barcode':
      return {
        id: action.id,
        component: () => import('../components/preview/BarcodeCanvas.vue'),
        options: { ...options },
        props: { ...action }
      };

    case 'qrCode':
      return {
        id: action.id,
        component: () => import('../components/preview/QrCodeCanvas.vue'),
        options: { ...options },
        props: { ...action }
      };

    case 'image':
      return {
        id: action.id,
        component: () => import('../components/preview/ImageCanvas.vue'),
        options: { ...options },
        props: { ...action }
      };

    case 'text':
      return {
        id: action.id,
        component: () => import('../components/preview/TextCanvas.vue'),
        options: { ...options },
        props: { ...action }
      };

    case 'nativeText':
      return {
        id: action.id,
        component: () => import('../components/preview/NativeText.vue'),
        options: { ...options },
        props: { ...action }
      };

    case 'feedPitch':
      return {
        id: action.id,
        component: () => import('../components/preview/FeedPitch.vue'),
        options: { ...options },
        props: { ...action.value }
      };
  }
  return null;
};

export const getDefaultGridOptions = () => {
  return {
    widths: [1],
    data: [[]],
    options: {
      columnGutter: 0,
      rowGutter: 0
    },
    imageOptions: getDefaultPrepareOptions()
  };
};

export const getDefaultTextOptions = () => {
  return {
    text: 'Sample',
    options: {
      fontSize: 16,
      align: 'left',
      lineSpace: 0,
      wordGap: 0,
      margin: 0,
      fontFamily: null,
      color: '#000',
      weight: 400,
      italic: false
    },
    imageOptions: getDefaultPrepareOptions()
  };
};

export const getDefaultImageOptions = () => {
  return {
    file: null,
    imageOptions: getDefaultPrepareOptions()
  };
};
export const getDefaultQRCodeOptions = () => {
  return {
    text: 'Sample',
    options: {
      errorCorrectionLevel: 'M',
      margin: 0,
      scale: 4,
      small: false
    },
    imageOptions: getDefaultPrepareOptions()
  };
};

export const getDefaultBarcodeOptions = () => {
  return {
    text: 'Sample',
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
    imageOptions: getDefaultPrepareOptions()
  };
};
