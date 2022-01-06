import { ALIGN, FONT } from 'devterm/config';
import { getQRCode, getBarcode } from 'devterm/utils/canvas';
import { getCanvasFromUrl, getBuffersFromCanvas } from '../canvas';

export default {
  cutLine: {
    display: () => ({
      title: 'Cut Line'
    })
  },
  barcode: {
    display: (value) => ({
      title: 'Barcode',
      value: value.text
    }),
    beforePrinterCommand: async (action) => {
      const { text, options, imageOptions } = action.value;
      const canvas = await getBarcode(text || 'empty', options || {});
      action.value = await getBuffersFromCanvas(canvas, imageOptions);
      return action;
    }
  },
  qrCode: {
    display: (value) => ({
      title: 'QR Code',
      value: value.text
    }),
    beforePrinterCommand: async (action) => {
      const { text, options, imageOptions } = action.value;
      const canvas = await getQRCode(text || 'empty', options || {});
      action.value = await getBuffersFromCanvas(canvas, imageOptions);
      return action;
    }
  },
  image: {
    display: () => ({
      title: 'Image'
    }),
    beforePrinterCommand: async (action) => {
      const { file, imageOptions } = action.value;
      action.value = await getBuffersFromCanvas(await getCanvasFromUrl(file), imageOptions);
      return action;
    }
  },
  text: {
    display: value => ({
      title: 'Text',
      value: `${value.slice(0, 16)}…`
    })
  },
  feedPitch: {
    display: ({ type, value }) => ({
      title: 'Feed-Pitch',
      value: `${type} | ${value}`
    })
  },
  reset: {
    display: value => ({
      property: true,
      title: 'Reset'
    })
  },
  setAlign: {
    display: value => ({
      property: true,
      title: 'Align',
      value: `${Object.entries(ALIGN).find(align => align[1] === value)[0]}`
    })
  },
  setFont: {
    display: value => ({
      property: true,
      title: 'Font',
      value: Object.entries(FONT).find((font) => Number(value) === font[1])[0]
    })
  },
  setLineSpace: {
    display: (value) => ({
      property: true,
      title: 'Line-Space',
      value
    })
  },
  setWordGap: {
    display: value => ({
      property: true,
      title: 'Word-Gap',
      value
    })
  },
  setMargin: {
    display: value => ({
      property: true,
      title: 'Margin',
      value
    })
  },
  setDensity: {
    display: value => ({
      property: true,
      title: 'Density',
      value
    })
  }
};
