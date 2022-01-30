import { ALIGN, FONT, MAX_DOTS } from 'devterm/config';
import { getQRCode, getBarcode, prepareCanvasForPrint } from 'devterm/utils/canvas';
import ActionDescription from '../../classes/ActionDescription';
import { getDefaultFontOptions, getDefaultTextOptions } from '../../utils/action';
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
      value: `Columns: ${value.data.length}`
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
        return await Promise.all(column.filter(({ visible }) => visible).map(async action => {
          let columnWidth = parseInt(maxWidth / data.length) * widths[index];
          if (widths[index] === 1) {
            columnWidth += parseInt(maxWidth / data.length) * offset;
          }
          if (gutterCount > 0) {
            columnWidth = (columnWidth - ((columnGutter * gutterCount) / data.length));
          }
          const { value } = action;
          (value.imageOptions = value.imageOptions || {}).width = columnWidth;
          try {
            return await definitions[String(action.type)].beforePrinterCommand({ ...action }, false);
          } catch (error) {
            return definitions.text.beforePrinterCommand(new ActionDescription({
              visible: true,
              value: {
                ...getDefaultTextOptions(),
                text: error.message,
                imageOptions: value.imageOptions
              }
            }), false);
          }
        }));
      }));

      const height = resolvedColumns.reduce((result, column) => {
        const gutterCount = (column.length - 1);
        return Math.max(column.filter(({ visible }) => visible).reduce((result, { value }) => {
          return result + value.height;
        }, gutterCount * rowGutter), result);
      }, 1);

      let canvas = new OffscreenCanvas(maxWidth, height);
      const ctx = canvas.getContext('2d');
      let x = 0;

      resolvedColumns.forEach((column, columnIndex) => {
        let y = 0;
        const columnX = column.filter(({ visible }) => visible).reduce((result, { value }, rowIndex) => {
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
      value: `${value.text.slice(0, 16)}…`
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
      value: `${value.text.slice(0, 16)}…`
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
  spacer: {
    display: () => ({
      title: 'Spacer'
    }),
    beforePrinterCommand: async (action, buffer = true) => {
      const { value, imageOptions } = action.value;
      let canvas = new OffscreenCanvas(imageOptions?.width || MAX_DOTS, Math.max(value, 1));
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
  table: {
    display: value => ({
      title: 'Table',
      value: `Rows: ${value.data.length}; Columns: ${value.data[0]?.length}; `
    }),
    beforePrinterCommand: async (action, buffer = true) => {
      const { data, columns, options, imageOptions } = action.value;
      const maxWidth = imageOptions?.width || MAX_DOTS;

      const width = imageOptions?.width || MAX_DOTS;

      try {
        const {
          columnGutter, rowGutter
        } = { columnGutter: 12, rowGutter: 12, ...options };
        let rows = data;

        if (rows.length < 1) {
          throw new Error('Table empty!');
        }

        const cellCount = columns.length;
        const cellWidth = (width / cellCount) - ((cellCount - 1) * columnGutter) / cellCount;

        let offset = columns.filter(({ width }) => width < 1).reduce((result, { width }) => { return result + (1 - width); }, 0);
        offset /= columns.filter(({ width }) => width === 1).length;

        const rowHeights = [];
        rows = await Promise.all(rows.map((row, y) => {
          return Promise.all(Array(columns.length).fill({}).map(async (value, x) => {
            value = row[x];
            let cellOptions;

            if (!options.useColumnStyles) {
              cellOptions = options.bodyOptions || {};
              if (options.headActive && y < 1) {
                cellOptions = options.headOptions;
              } else if (options.footActive && (rows.length - 1) === y) {
                cellOptions = options.footOptions;
              }
            } else {
              cellOptions = columns[x].bodyOptions || {};
              if (options.headActive && y < 1) {
                cellOptions = columns[x].headOptions;
              } else if (options.footActive && (rows.length - 1) === y) {
                cellOptions = columns[x].footOptions;
              }
            }

            let _cellWidth = parseInt(cellWidth * columns[x].width);
            if (columns[x].width === 1) {
              _cellWidth += parseInt(maxWidth / columns.length * offset);
            }
            value = await drawText(String(value === undefined ? '' : value), cellOptions, _cellWidth);
            rowHeights[y] = Math.max(value.height, rowHeights[y] || 0);
            return value;
          }));
        }));

        const height = rowHeights.reduce((result, value) => (result + value), 0) + (rows.length - 1) * rowGutter;
        let x = 0;

        let canvas = new OffscreenCanvas(imageOptions?.width || MAX_DOTS, height);
        const ctx = canvas.getContext('2d');

        columns.forEach((column, columnIndex) => {
          let y = 0;
          const columnX = rows.reduce((result, row, rowIndex) => {
            const value = row[columnIndex];
            ctx.drawImage(value, x, y);
            y += rowHeights[rowIndex] + (rowIndex < column.length ? rowGutter : 0);
            return Math.max(value.width, result);
          }, 0);
          x += columnX + (columnIndex < columns.length ? columnGutter : 0);
        });

        canvas = prepareCanvasForPrint(canvas, imageOptions);
        action.value = buffer ? await getBuffersFromCanvas(canvas) : canvas;
        return action;
      } catch (error) {
        return await definitions.text.beforePrinterCommand(new ActionDescription({
          visible: true,
          value: {
            ...{ ...getDefaultTextOptions(), options: { ...getDefaultFontOptions, align: ALIGN.CENTER, weight: 700, underline: true } },
            text: error.message
          }
        }), buffer);
      }
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
