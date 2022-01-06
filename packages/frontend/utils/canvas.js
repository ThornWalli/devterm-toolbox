import { Buffer } from 'buffer';
import { prepareCanvasForPrint } from 'devterm/utils/canvas';
import {
  MAX_DOTS,
  ASCII_GS,
  IMAGE_MAX
} from 'devterm/config';

import {
  get8BitRowsFromImageData, getImageSize,
  splitCanvasInImageDataChunks
} from 'devterm/utils/image';

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

export const preparePreview = (canvas, colors) => {
  canvas = resizeCanvas(canvas, MAX_DOTS);
  const ctx = canvas.getContext('2d');

  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

  grayscale(imageData.data, [colors.printer.preview.foreground, colors.printer.preview.background]);
  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

const grayscale = (data, colors) => {
  for (let i = 0; i < data.length; i += 4) {
    const brightness = ((data[i] + data[i + 1] + data[i + 2]) / 3) / 255;
    if (brightness < 0.6) {
      data[i] = colors[0][0];
      data[i + 1] = colors[0][1];
      data[i + 2] = colors[0][2];
    } else {
      data[i] = colors[1][0];
      data[i + 1] = colors[1][1];
      data[i + 2] = colors[1][2];
    }
  }
};

export const getBufferListFromCanvas = async (canvas) => {
  const imageDatas = await splitCanvasInImageDataChunks(canvas);
  const commandBuffers = imageDatas.map(imageData => {
    return [Buffer.from(getWriteImageCommand(imageData.width, imageData.height))].concat(get8BitRowsFromImageData(imageData).map(row => uint8ArrayToBuffer(row)));
  }).flat();
  return commandBuffers;
};

const getWriteImageCommand = (width, height) => {
  const { xL, xH, yL, yH, k } = getImageSize(width, height);

  const cmd = [
    ASCII_GS,
    0x76, // 118
    0x30, // 48,
    0,
    xL, xH, yL, yH
  ];

  if (cmd[0] === ASCII_GS && cmd[1] === 118 && cmd[2] === 48) {
    if (!(k <= IMAGE_MAX)) {
      throw new Error(`Image too large; ${k} > ${IMAGE_MAX}`);
    }
  }

  return cmd;
};
export const uint8ArrayToBuffer = function (array) {
  const buf = Buffer.alloc(array.byteLength);
  const view = new Uint8Array(array);
  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
};

export const getBuffersFromCanvas = (canvas, imageOptions) => {
  canvas = prepareCanvasForPrint(canvas, imageOptions);
  return getBufferListFromCanvas(canvas);
};
