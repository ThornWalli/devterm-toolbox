
import { DEFAULT_DENSITY, ALIGN, FONT, getDefaultConfig, MAX_PIXELS_FONT } from 'devterm/config';
import { getDefaultPrepareOptions } from 'devterm/utils/canvas';

import ActionSetAlign from '../components/controls/actions/SetAlign.vue';
import ActionSetFont from '../components/controls/actions/SetFont.vue';
import ActionSetMargin from '../components/controls/actions/SetMargin.vue';
import ActionSetLineSpace from '../components/controls/actions/SetLineSpace.vue';
import ActionSetWordGap from '../components/controls/actions/SetWordGap.vue';
import ActionSetDensity from '../components/controls/actions/SetDensity.vue';
import ActionText from '../components/controls/actions/Text.vue';
import ActionNativeText from '../components/controls/actions/NativeText.vue';
import ActionImage from '../components/controls/actions/Image.vue';
import ActionQrCode from '../components/controls/actions/QrCode.vue';
import ActionFeedPitch from '../components/controls/actions/FeedPitch.vue';
import { DropDownOptionDescription } from '../components/base/DropDown.vue';

import ActionDescription from '../classes/ActionDescription';

export const getActionTypes = () => {
  return [
    { title: 'Margin', value: 'setMargin', group: 'Layout' },
    { title: 'Font', value: 'setFont', group: 'Layout' },
    { title: 'Align', value: 'setAlign', group: 'Layout' },
    { title: 'LineSpace', value: 'setLineSpace', group: 'Layout' },
    { title: 'WordGap', value: 'setWordGap', group: 'Layout' },
    { title: 'Image', value: 'image', group: 'Content' },
    { title: 'QRCode', value: 'qrCode', group: 'Content' },
    { title: 'Barcode', value: 'barcode', group: 'Content' },
    { title: 'Text', value: 'text', group: 'Content' },
    { title: 'NativeText', value: 'nativeText', group: 'Content' },
    { title: 'Reset', value: 'reset', group: 'General' },
    { title: 'Feed Pitch', value: 'feedPitch', group: 'General' },
    { title: 'Cutline', value: 'cutLine', group: 'General' },
    { title: 'Density', value: 'setDensity', group: 'General' }
  ];
};

export const getActionTypeOptions = () => {
  return [
    new DropDownOptionDescription({ title: 'Add new Action…', value: '' }),
    ...getActionTypes().map(actionType => new DropDownOptionDescription(actionType))
  ];
};

export const getComponentByType = (type) => {
  return {
    setMargin: ActionSetMargin,
    setAlign: ActionSetAlign,
    setFont: ActionSetFont,
    setDensity: ActionSetDensity,
    text: ActionText,
    nativeText: ActionNativeText,
    image: ActionImage,
    qrCode: ActionQrCode,
    setLineSpace: ActionSetLineSpace,
    setWordGap: ActionSetWordGap,
    feedPitch: ActionFeedPitch
  }[type];
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
        component: () => import('../components/preview/NativeTextCanvas.vue'),
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
        component: () => import('../components/preview/NativeTextCanvas.vue'),
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
