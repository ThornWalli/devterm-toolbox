import { ALIGN, FONT, MAX_DOTS } from 'devterm/config';
import { getQRCode, getBarcode, prepareCanvasForPrint, createCanvas } from 'devterm/utils/canvas';
import { getCanvasFromUrl, getBuffersFromCanvas, drawText } from '../canvas';
import definitions from '../../utils/action/definitions';

export default {
  cutLine: {
    display: () => ({
      title: 'Cut Line'
    })
  },
  grid: {
    display: (value) => ({
      title: 'Grid',
      value: value.text
    }),
    beforePrinterCommand: async (action, buffer = true) => {
      const { widths, data, options, imageOptions } = action.value;

      const maxWidth = imageOptions?.width || MAX_DOTS;

      const {
        columnGutter, rowGutter
      } = { columnGutter: 12, rowGutter: 12, ...options };

      let offset = widths.filter(v => v < 1).reduce((result, v) => { return result + (1 - v); }, 0);
      offset /= widths.filter(v => v === 1).length;

      const resolvedColumns = await Promise.all(data.map(async (column, index) => {
        const gutterCount = (data.length - 1);
        return await Promise.all(column.map(action => {
          let columnWidth = parseInt(maxWidth / data.length) * widths[index];
          if (widths[index] === 1) {
            columnWidth += parseInt(maxWidth / data.length) * offset;
          }
          if (gutterCount > 0) {
            columnWidth = (columnWidth - ((columnGutter * gutterCount) / data.length));
            // columnWidth -= Math.ceil((columnGutter * gutterCount) / (data.length));
          }
          const { value } = action;
          console.log('columnWidth', columnWidth, value.imageOptions);
          (value.imageOptions = value.imageOptions || {}).width = columnWidth;
          return definitions[String(action.type)].beforePrinterCommand({ ...action }, false);
        }));
      }));

      const height = resolvedColumns.reduce((result, column) => {
        const gutterCount = (column.length - 1);
        return Math.max(column.reduce((result, { value }) => {
          return result + value.height;
        }, gutterCount * rowGutter), result);
      }, 1);

      let canvas = createCanvas(maxWidth, height);
      const ctx = canvas.getContext('2d');
      let x = 0;
      resolvedColumns.forEach((column, columnIndex) => {
        let y = 0;
        const columnX = column.reduce((result, { value }, rowIndex) => {
          ctx.drawImage(value, x, y);
          y += value.height + (rowIndex < column.length ? rowGutter : 0);
          return Math.max(value.width, result);
        }, 0);
        x += columnX + (columnIndex < resolvedColumns.length ? columnGutter : 0);
      });

      canvas = prepareCanvasForPrint(canvas, imageOptions);
      action.value = buffer ? await getBuffersFromCanvas(canvas) : canvas;
      return action;
    }
  },
  barcode: {
    display: (value) => ({
      title: 'Barcode',
      value: value.text
    }),
    beforePrinterCommand: async (action, buffer = true) => {
      const { text, options, imageOptions } = action.value;
      let canvas = await getBarcode(text || 'empty', options || {});
      canvas = prepareCanvasForPrint(canvas, imageOptions);
      action.value = buffer ? await getBuffersFromCanvas(canvas) : canvas;
      return action;
    }
  },
  qrCode: {
    display: (value) => ({
      title: 'QR Code',
      value: value.text
    }),
    beforePrinterCommand: async (action, buffer = true) => {
      const { text, options, imageOptions } = action.value;
      const qrCodeOptions = { ...options };
      qrCodeOptions.width = options.width || imageOptions.width;
      let canvas = await getQRCode(text || 'empty', qrCodeOptions);
      canvas = prepareCanvasForPrint(canvas, imageOptions);
      action.value = buffer ? await getBuffersFromCanvas(canvas) : canvas;
      return action;
    }
  },
  image: {
    display: () => ({
      title: 'Image'
    }),
    beforePrinterCommand: async (action, buffer = true) => {
      const { file, imageOptions } = action.value;
      let canvas = await getCanvasFromUrl(file);
      canvas = prepareCanvasForPrint(canvas, imageOptions);
      action.value = buffer ? await getBuffersFromCanvas(canvas) : canvas;
      return action;
    }
  },
  text: {
    display: value => ({
      title: 'Text',
      value: `${value.text.slice(0, 16)}…`
    }),
    beforePrinterCommand: async (action, buffer = true) => {
      const { text, options, imageOptions } = action.value;
      let canvas = await drawText(text || 'empty', options || {}, imageOptions?.rotate ? null : (imageOptions?.width || MAX_DOTS));
      canvas = prepareCanvasForPrint(canvas, imageOptions);
      action.value = buffer ? await getBuffersFromCanvas(canvas) : canvas;
      return action;
    }
  },
  nativeText: {
    display: value => ({
      title: 'Native Text',
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
