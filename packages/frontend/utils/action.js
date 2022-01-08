
import { DEFAULT_DENSITY, ALIGN, FONT, getDefaultConfig, MAX_PIXELS_FONT } from 'devterm/config';
import ActionSetAlign from '../components/controls/actions/SetAlign.vue';
import ActionSetFont from '../components/controls/actions/SetFont.vue';
import ActionSetMargin from '../components/controls/actions/SetMargin.vue';
import ActionSetLineSpace from '../components/controls/actions/SetLineSpace.vue';
import ActionSetWordGap from '../components/controls/actions/SetWordGap.vue';
import ActionSetDensity from '../components/controls/actions/SetDensity.vue';
import ActionText from '../components/controls/actions/Text.vue';
import ActionImage from '../components/controls/actions/Image.vue';
import ActionQrCode from '../components/controls/actions/QrCode.vue';
import ActionFeedPitch from '../components/controls/actions/FeedPitch.vue';
import { DropDownOptionDescription } from '../components/base/DropDown.vue';

import ActionDescription from '../classes/ActionDescription';

export const getActionTypeOptions = () => {
  return [
    new DropDownOptionDescription({ title: 'Add new Action…', value: '' }),
    new DropDownOptionDescription({ title: 'Set Margin', value: 'setMargin' }),
    new DropDownOptionDescription({ title: 'Set Font', value: 'setFont' }),
    new DropDownOptionDescription({ title: 'Set Align', value: 'setAlign' }),
    new DropDownOptionDescription({ title: 'Set Density', value: 'setDensity' }),
    new DropDownOptionDescription({ title: 'Set LineSpace', value: 'setLineSpace' }),
    new DropDownOptionDescription({ title: 'Set WordGap', value: 'setWordGap' }),
    new DropDownOptionDescription({ title: 'Feed Pitch', value: 'feedPitch' }),
    new DropDownOptionDescription({ title: 'Reset', value: 'reset' }),
    new DropDownOptionDescription({ title: 'Image', value: 'image' }),
    new DropDownOptionDescription({ title: 'QRCode', value: 'qrCode' }),
    new DropDownOptionDescription({ title: 'Barcode', value: 'barcode' }),
    new DropDownOptionDescription({ title: 'Text', value: 'text' }),
    new DropDownOptionDescription({ title: 'Cutline', value: 'cutLine' })
  ];
}; console.log('DEFAULT_DENSITY', DEFAULT_DENSITY);

export const getComponentByType = (type) => {
  return {
    setMargin: ActionSetMargin,
    setAlign: ActionSetAlign,
    setFont: ActionSetFont,
    setDensity: ActionSetDensity,
    text: ActionText,
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
  return actions.map(action => executeAction(action, options)).filter(Boolean);
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
        component: () => import('../components/preview/TextCanvas.vue'),
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

export const getDefaultImageOptions = () => {
  return {
    file: null,
    imageOptions: {
      grayscale: false,
      rotate: false,
      flipX: false,
      flipY: false,
      width: null
    }
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
    imageOptions: {
      rotate: false,
      flipX: false,
      flipY: false,
      width: null
    }
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
    imageOptions: {
      rotate: false,
      flipX: false,
      flipY: false,
      width: null
    }
  };
};
