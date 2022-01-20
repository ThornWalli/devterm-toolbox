import { prepareCanvasForPrint } from 'devterm/utils/canvas';
import {
  MAX_DOTS, ALIGN
} from 'devterm/config';

import {
  getImageWriteBuffersFromCanvas
} from 'devterm/utils/printer';

export const toDataURL = (targetCanvas) => {
  const canvas = document.createElement('canvas');
  canvas.width = targetCanvas.width;
  canvas.height = targetCanvas.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(targetCanvas, 0, 0);
  console.log('update Canvas', canvas);
  return canvas.toDataURL('image/png', 100);
};

export const resizeCanvas = (canvas, width, height) => {
  if (width) {
    if (canvas.width <= width) {
      return canvas;
    }
    height = width * (canvas.height / canvas.width);
  } else {
    if (canvas.height <= height) {
      return canvas;
    }
    width = height * (canvas.width / canvas.height);
  }
  const resizedCanvas = new OffscreenCanvas(width, height);
  resizedCanvas.getContext('2d').drawImage(canvas, 0, 0, width, height);
  return resizedCanvas;
};

export const getCanvasFromUrl = async (dataUrl) => {
  const img = new window.Image();
  await new Promise(resolve => {
    img.onload = () => resolve(img);
    img.src = dataUrl;
    img.crossOrigin = 'anonymous';
  });
  const canvas = new OffscreenCanvas(img.naturalWidth, img.naturalHeight);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return canvas;
};

export const preparePreview = (canvas, colors, density = 1, withGrayscale = true) => {
  canvas = resizeCanvas(canvas, MAX_DOTS);
  const ctx = canvas.getContext('2d');

  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

  withGrayscale && grayscale(imageData.data, [colors.foreground, colors.background], density);
  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

const grayscale = (data, colors, density) => {
  for (let i = 0; i < data.length; i += 4) {
    const brightness = ((data[i] + data[i + 1] + data[i + 2]) / 3) / 255;
    if (brightness < 0.6) {
      data[i] = colors[0][0];
      data[i + 1] = colors[0][1];
      data[i + 2] = colors[0][2];
      data[i + 3] = parseInt(data[i + 3] * density);
    } else {
      data[i] = colors[1][0];
      data[i + 1] = colors[1][1];
      data[i + 2] = colors[1][2];
      data[i + 3] = parseInt(data[i + 3] * density);
    }
  }
};

export const getBuffersFromCanvas = (canvas, imageOptions) => {
  canvas = prepareCanvasForPrint(canvas, imageOptions);
  return getImageWriteBuffersFromCanvas(canvas);
};

export const drawText = (text, options, width, colors) => {
  colors = { background: [255, 255, 255], foreground: [0, 0, 0], ...colors };
  const {
    fontSize,
    align,
    lineSpace,
    wordGap,
    margin,
    fontFamily,
    weight,
    italic
  } = {
    fontSize: 12,
    align: ALIGN.LEFT,
    wordGap: 0,
    lineSpace: 0,
    margin: 0,
    fontFamily: 'sans-serif',
    color: '#000',
    weight: 400,
    italic: false,
    ...options
  };
  const margin_ = [0, width * margin, 0, 0];
  console.log(margin_);
  let x = 0;
  let width_ = width;

  switch (align) {
    case ALIGN.RIGHT:
      x += width;
      width_ -= margin_[1];
      break;
    case ALIGN.CENTER:
      x += width_ / 2;
      break;
    default:
      x += margin_[1];
      width_ -= margin_[1];
      break;
  }

  const font = `${italic ? 'italic ' : ''}${weight} ${fontSize}px "${fontFamily}"`;
  const canvas = document.createElement('canvas');
  canvas.style.display = 'none';
  canvas.width = width;
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');
  ctx.canvas.style.letterSpacing = `${wordGap}px`;
  ctx.font = font;
  const lineHeight = Math.max(lineSpace, fontSize) / fontSize;
  const rows = text.split('\n').map(text => prepareText(ctx, text, 0, 0, fontSize, width_)).flat();
  canvas.height = (rows.length * fontSize) * lineHeight + margin_[0] + margin_[2];

  ctx.fillStyle = `rgb(${colors.background.join(' ')})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `rgb(${colors.foreground.join(' ')})`;
  ctx.textBaseline = 'top';
  ctx.font = font;
  ctx.canvas.style.letterSpacing = `${wordGap}px`;
  ctx.textAlign = {
    [ALIGN.LEFT]: 'left',
    [ALIGN.CENTER]: 'center',
    [ALIGN.RIGHT]: 'right'
  }[Number(align)];

  ctx.translate(0, margin_[0]);
  rows.forEach((row, i) => {
    ctx.fillText(row, x, i * lineHeight * fontSize - (fontSize - lineHeight * fontSize) / 2);
  });
  canvas.remove();
  return canvas;
};

function prepareText (ctx, text, x, y, lineHeight, fitWidth, result = []) {
  fitWidth = fitWidth || 0;
  if (fitWidth <= 0) {
    return [text];
  }

  for (let idx = 1; idx <= text.length; idx++) {
    const str = text.substr(0, idx);
    if (ctx.measureText(str).width > fitWidth) {
      result.push(text.substr(0, idx - 1));
      result = result.concat(prepareText(ctx, text.substr(idx - 1), x, y + lineHeight, lineHeight, fitWidth));
      return result;
    }
  }
  result.push(text);
  return result;
}
