import { FONT } from 'devterm/config';

import font5x7ISO88591 from '../assets/fonts/5x7-ISO8859-1.ttf';
import font6x12ISO88591 from '../assets/fonts/6x12-ISO8859-1.ttf';
import font7x14ISO88591 from '../assets/fonts/7x14-ISO8859-1.ttf';
import fontPx437CompaqThin8x16 from '../assets/fonts/Px437_CompaqThin_8x16.ttf';

export const loadFonts = () => {
  const fonts = [
    ['5x7-ISO8859-1', `url(${font5x7ISO88591})`],
    ['6x12-ISO8859-1', `url(${font6x12ISO88591})`],
    ['7x14-ISO8859-1', `url(${font7x14ISO88591})`],
    ['Px437_CompaqThin_8x16', `url(${fontPx437CompaqThin8x16})`]
  ];

  return Promise.all(fonts.map(async (font) => {
    console.log('load font', font[0], font[1]);
    const fontFace = (new FontFace(...font));
    await fontFace.load();
    document.fonts.add(fontFace);
    return fontFace;
  }));
};

export const FONT_MAP = {
  [FONT.SIZE_5_7]: { fontFamily: '5x7-ISO8859-1', fontSize: 7 },
  [FONT.SIZE_6_12]: { fontFamily: '6x12-ISO8859-1', fontSize: 12 },
  [FONT.SIZE_7_14]: { fontFamily: '7x14-ISO8859-1', fontSize: 14 },
  [FONT.SIZE_8_16_THIN_1]: { fontFamily: 'Px437_CompaqThin_8x16', fontSize: 16 },
  [FONT.SIZE_8_16_THIN_2]: { fontFamily: 'Px437_CompaqThin_8x16', fontSize: 16 }
};
