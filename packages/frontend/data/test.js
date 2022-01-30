/* eslint-disable no-unused-vars */

import { ALIGN, FONT, MAX_DENSITY } from 'devterm/config';
import { FONT_ALIGN, getDefaultFontOptions, getDefaultTableColumnOptions } from '../utils/action';
import ActionDescription from '../classes/ActionDescription';
import devtermUri from './uris/devterm';

export const writeHeadline = (text) => {
  return [
    { type: 'reset' },
    { type: 'feedPitch', value: { value: 2, type: 'font' } },
    { type: 'setDensity', value: 15 },
    { type: 'nativeText', value: text },
    { type: 'reset' },
    { type: 'feedPitch', value: { value: 2, type: 'font' } }];
};

export default [
  { type: 'reset' },

  {
    id: '4374d709-ab96-4d35-84b9-b4f08f29e6de',
    type: 'table',
    value: {
      data: [
        [
          'test test test test test test test test test test test test test ',
          2,
          3
        ],
        [
          0,
          0,
          0
        ],
        [
          0,
          0,
          0
        ],
        [
          0,
          0,
          0
        ],
        [
          0,
          0,
          0
        ],
        [
          0,
          0,
          0
        ]
      ],
      options: {
        columnGutter: 0,
        rowGutter: 0
      },
      headActive: false,
      footActive: false,
      columns: [
        {
          width: 1,
          bodyOptions: {
            fontSize: 16,
            align: FONT_ALIGN.LEFT,
            lineSpace: 0,
            wordGap: 0,
            margin: 0,
            fontFamily: '"Arial"',
            color: '#000',
            weight: 400,
            italic: false,
            underline: true
          },
          headOptions: getDefaultFontOptions(),
          footOptions: getDefaultFontOptions()
        },
        {
          width: 1,
          bodyOptions: {
            fontSize: 16,
            align: FONT_ALIGN.CENTER,
            lineSpace: 0,
            wordGap: 0,
            margin: 0,
            fontFamily: '"Arial"',
            color: '#000',
            weight: 400,
            italic: false
          },
          headOptions: getDefaultFontOptions(),
          footOptions: getDefaultFontOptions()
        },
        {
          width: 1,
          bodyOptions: {
            fontSize: 16,
            align: FONT_ALIGN.RIGHT,
            lineSpace: 0,
            wordGap: 0,
            margin: 0,
            fontFamily: '"Arial"',
            color: '#000',
            weight: 400,
            italic: false
          },
          headOptions: getDefaultFontOptions(),
          footOptions: getDefaultFontOptions()
        },
        {
          width: 1,
          bodyOptions: {
            fontSize: 16,
            align: FONT_ALIGN.LEFT,
            lineSpace: 0,
            wordGap: 0,
            margin: 0,
            fontFamily: '"Arial"',
            color: '#000',
            weight: 400,
            italic: false,
            underline: true
          },
          headOptions: getDefaultFontOptions(),
          footOptions: getDefaultFontOptions()
        },
        {
          width: 1,
          bodyOptions: {
            fontSize: 16,
            align: FONT_ALIGN.CENTER,
            lineSpace: 0,
            wordGap: 0,
            margin: 0,
            fontFamily: '"Arial"',
            color: '#000',
            weight: 400,
            italic: false
          },
          headOptions: getDefaultFontOptions(),
          footOptions: getDefaultFontOptions()
        },
        {
          width: 1,
          bodyOptions: {
            fontSize: 16,
            align: FONT_ALIGN.RIGHT,
            lineSpace: 0,
            wordGap: 0,
            margin: 0,
            fontFamily: '"Arial"',
            color: '#000',
            weight: 400,
            italic: false
          },
          headOptions: getDefaultFontOptions(),
          footOptions: getDefaultFontOptions()
        }
      ]
    },
    visible: true
  },
  {
    id: '6319ab91-5740-49c0-8265-1d05d97014a3',
    type: 'grid',
    value: {
      widths: [
        1,
        1
      ],
      data: [
        [
          {
            id: '7d4b8881-37d3-4b80-98e2-dbef273fd321',
            type: 'spacer',
            value: {
              value: 200

            },
            visible: true
          },
          {
            id: '7d4b8881-37d3-4b80-98e2-dbef273fd320',
            type: 'text',
            value: {
              text: 'Item 1.\nItem 2.\nItem 3.\nItem 4.',
              options: {
                fontSize: '24',
                align: 'left',
                lineSpace: '30',
                wordGap: 0,
                margin: 0,
                fontFamily: null,
                color: '#000',
                weight: 400,
                italic: false
              },
              imageOptions: {
                width: 192,
                rotate: false,
                flipX: false,
                flipY: false,
                invert: false,
                grayscale: false
              }
            },
            visible: true
          }
        ],
        [
          {
            id: 'cafb2f8d-add1-4c34-9c1e-6f19c63732ac',
            type: 'text',
            value: {
              text: '0,00\n0,00\n0,00\n0,00',
              options: {
                fontSize: '24',
                align: FONT_ALIGN.LEFT,
                lineSpace: '30',
                wordGap: 0,
                margin: 0,
                fontFamily: null,
                color: '#000',
                weight: 400,
                italic: false
              },
              imageOptions: {
                width: 192,
                rotate: false,
                flipX: false,
                flipY: false,
                invert: false,
                grayscale: false
              }
            },
            visible: true
          }
        ]
      ],
      options: {
        columnGutter: 0,
        rowGutter: 0
      },
      imageOptions: {
        width: null,
        rotate: false,
        flipX: false,
        flipY: false,
        invert: false,
        grayscale: false
      }
    },
    visible: true
  },
  // {
  //   type: 'image',
  //   value: {
  //     file: devtermUri,
  //     imageOptions: {
  //       grayscale: true,
  //       rotate: false,
  //       flipX: false,
  //       flipY: false,
  //       width: 100
  //     }
  //   }
  // },
  // {
  //   type: 'grid',
  //   value: {
  //     widths: [
  //       1,
  //       1
  //     ],
  //     data: [
  //       [
  //         {
  //           type: 'qrCode',
  //           value: {
  //             text: 'Column A',
  //             options: {
  //               errorCorrectionLevel: 'M',
  //               margin: 0,
  //               scale: 4,
  //               small: false
  //             },
  //             imageOptions: {
  //               rotate: false,
  //               flipX: false,
  //               flipY: false,
  //               width: null
  //             }
  //           }
  //         },
  //         {
  //           type: 'text',
  //           value: {
  //             text: 'Sample',
  //             options: {
  //               fontSize: 20,
  //               lineSpace: 20,
  //               align: ALIGN.Left,
  //               wordGap: 0,
  //               margin: 0,
  //               fontFamily: 'Arial',
  //               color: 0
  //             }
  //           }
  //         },
  //         {
  //           type: 'qrCode',
  //           value: {
  //             text: 'Column A',
  //             options: {
  //               errorCorrectionLevel: 'M',
  //               margin: 0,
  //               scale: 4,
  //               small: false
  //             },
  //             imageOptions: {
  //               rotate: false,
  //               flipX: false,
  //               flipY: false,
  //               width: null
  //             }
  //           }
  //         }
  //       ],
  //       [
  //         {
  //           type: 'qrCode',
  //           value: {
  //             text: 'Column B',
  //             options: {
  //               errorCorrectionLevel: 'M',
  //               margin: 0,
  //               scale: 4,
  //               small: false
  //             },
  //             imageOptions: {
  //               rotate: false,
  //               flipX: false,
  //               flipY: false,
  //               width: null
  //             }
  //           }
  //         },
  //         {
  //           type: 'qrCode',
  //           value: {
  //             text: 'Column B',
  //             options: {
  //               errorCorrectionLevel: 'M',
  //               margin: 0,
  //               scale: 4,
  //               small: false
  //             },
  //             imageOptions: {
  //               rotate: false,
  //               flipX: false,
  //               flipY: false,
  //               width: null
  //             }
  //           }
  //         }
  //       ]
  //     ]
  //   }
  // },
  // {
  //   type: 'grid',
  //   value: {
  //     options: {
  //       columnGutter: 12,
  //       rowGutter: 12
  //     },
  //     widths: [
  //       1, 1
  //     ],
  //     data: [
  //       [
  //         new ActionDescription({
  //           type: 'qrCode',
  //           value: {
  //             text: 'Column A',
  //             options: {
  //               errorCorrectionLevel: 'M',
  //               margin: 0,
  //               scale: 4,
  //               small: false
  //             },
  //             imageOptions: {
  //               rotate: false,
  //               flipX: false,
  //               flipY: false,
  //               width: null
  //             }
  //           }
  //         }),
  //         new ActionDescription({
  //           type: 'qrCode',
  //           value: {
  //             text: 'Column A',
  //             options: {
  //               errorCorrectionLevel: 'M',
  //               margin: 0,
  //               scale: 4,
  //               small: false
  //             },
  //             imageOptions: {
  //               rotate: false,
  //               flipX: false,
  //               flipY: false,
  //               width: null
  //             }
  //           }
  //         })
  //       ],
  //       [
  //         new ActionDescription({
  //           type: 'grid',
  //           value: {
  //             options: {
  //               columnGutter: 12,
  //               rowGutter: 12
  //             },
  //             widths: [1],
  //             data: [
  //               [{
  //                 type: 'text',
  //                 value: {
  //                   text: 'Lammpee',
  //                   options: {
  //                     fontSize: 48,
  //                     lineSpace: 20,
  //                     align: ALIGN.Left,
  //                     wordGap: 0,
  //                     margin: 0,
  //                     fontFamily: 'Arial',
  //                     color: 0
  //                   },
  //                   imageOptions: {
  //                     rotate: true
  //                   }
  //                 }
  //               }]],
  //             imageOptions: {
  //               invert: false,
  //               rotate: false,
  //               flipX: false,
  //               flipY: false,
  //               width: null
  //             }
  //           }
  //         })
  //       ]
  //     ]
  //   }
  // },
  // {
  //   type: 'grid',
  //   value: {
  //     data: [
  //       [
  //         {
  //           type: 'qrCode',
  //           value: {
  //             text: 'Devterm',
  //             options: {
  //               errorCorrectionLevel: 'M',
  //               margin: 0,
  //               scale: 4,
  //               small: false
  //             },
  //             imageOptions: {
  //               rotate: false,
  //               flipX: false,
  //               flipY: false,
  //               width: null
  //             }
  //           }
  //         }
  //       ],
  //       [
  //         {
  //           type: 'qrCode',
  //           value: {
  //             text: 'Devterm',
  //             options: {
  //               errorCorrectionLevel: 'M',
  //               margin: 0,
  //               scale: 4,
  //               small: false
  //             },
  //             imageOptions: {
  //               rotate: false,
  //               flipX: false,
  //               flipY: false,
  //               width: null
  //             }
  //           }
  //         },
  //         {
  //           type: 'qrCode',
  //           value: {
  //             text: 'Devterm',
  //             options: {
  //               errorCorrectionLevel: 'M',
  //               margin: 0,
  //               scale: 4,
  //               small: false
  //             },
  //             imageOptions: {
  //               rotate: false,
  //               flipX: false,
  //               flipY: false,
  //               width: null
  //             }
  //           }
  //         }
  //       ],
  //       [
  //         {
  //           type: 'text',
  //           value: {
  //             text: 'Sample',
  //             options: {
  //               fontSize: 90,
  //               align: ALIGN.CENTER,
  //               lineSpace: 0,
  //               wordGap: 0,
  //               margin: 0,
  //               fontFamily: 'Arial',
  //               color: 0
  //             }
  //           }
  //         },
  //         {
  //           type: 'qrCode',
  //           value: {
  //             text: 'Devterm',
  //             options: {
  //               errorCorrectionLevel: 'M',
  //               margin: 0,
  //               scale: 4,
  //               small: false
  //             },
  //             imageOptions: {
  //               rotate: false,
  //               flipX: false,
  //               flipY: false,
  //               width: null
  //             }
  //           }
  //         },
  //         {
  //           type: 'qrCode',
  //           value: {
  //             text: 'Devterm',
  //             options: {
  //               errorCorrectionLevel: 'M',
  //               margin: 0,
  //               scale: 4,
  //               small: false
  //             },
  //             imageOptions: {
  //               rotate: false,
  //               flipX: false,
  //               flipY: false,
  //               width: null
  //             }
  //           }
  //         }, {
  //           type: 'barcode',
  //           value: {
  //             text: 'Devterm',
  //             options: {
  //               format: '',
  //               height: 100,
  //               font: 'monospace',
  //               textAlign: 'center',
  //               textPosition: 'bottom',
  //               textMargin: 2,
  //               fontSize: 20,
  //               margin: 10,
  //               displayValue: true,
  //               flat: false
  //             },
  //             imageOptions: {
  //               rotate: false,
  //               flipX: false,
  //               flipY: false,
  //               width: 200
  //             }
  //           }
  //         }]
  //     ]
  //   }
  // },
  // { type: 'setDensity', value: 1 },
  // // { type: 'setAlign', value: ALIGN.CENTER },
  // {
  //   type: 'barcode',
  //   value: {
  //     text: 'Devterm',
  //     options: {
  //       format: '',
  //       height: 100,
  //       font: 'monospace',
  //       textAlign: 'center',
  //       textPosition: 'bottom',
  //       textMargin: 2,
  //       fontSize: 20,
  //       margin: 10,
  //       displayValue: true,
  //       flat: false
  //     },
  //     imageOptions: {
  //       rotate: false,
  //       flipX: false,
  //       flipY: false,
  //       width: null
  //     }
  //   }
  // },
  // { type: 'feedPitch', value: { value: 10, type: 'pixel' } },
  // {
  //   type: 'qrCode',
  //   value: {
  //     text: 'Devterm',
  //     options: {
  //       errorCorrectionLevel: 'M',
  //       margin: 0,
  //       scale: 4,
  //       small: false
  //     },
  //     imageOptions: {
  //       rotate: false,
  //       flipX: false,
  //       flipY: false,
  //       width: null
  //     }
  //   }
  // },

  // // { type: 'setFont', value: FONT.SIZE_8_16_THIN_1 },
  // {
  //   type: 'text',
  //   value: {
  //     text: 'Sample',
  //     options: {
  //       fontSize: 90,
  //       align: ALIGN.CENTER,
  //       lineSpace: 0,
  //       wordGap: 0,
  //       margin: 0,
  //       fontFamily: 'Arial',
  //       color: 0
  //     }
  //   }
  // },
  // { type: 'feedPitch', value: { value: 2, type: 'font' } },
  // { type: 'setFont', value: FONT.SIZE_8_16_THIN_2 },
  // { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipsci Lorem ipsum dolor sit amet, consetetur sadipsci' },
  // { type: 'feedPitch', value: { value: 2, type: 'font' } },
  // { type: 'setFont', value: FONT.SIZE_5_7 },
  // { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipsci Lorem ipsum dolor sit amet, consetetur sadipsci Lorem ipsum dolor sit amet, consetetur sadipsci' },
  // { type: 'feedPitch', value: { value: 2, type: 'font' } },
  // { type: 'setFont', value: FONT.SIZE_6_12 },
  // { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipsci Lorem ipsum dolor sit amet, consetetur sadipsci Lorem ipsum dolor sit amet, consetetur sadipsci' },
  // { type: 'feedPitch', value: { value: 2, type: 'font' } },
  // { type: 'setFont', value: FONT.SIZE_7_14 },
  // { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipsci Lorem ipsum dolor sit amet, consetetur sadipsci Lorem ipsum dolor sit amet, consetetur sadipsci Lorem ipsum dolor sit amet, consetetur sadipsci' },
  // { type: 'feedPitch', value: { value: 2, type: 'font' } },

  { type: 'feedPitch', value: { value: 15, type: 'font' } }
  // {
  //   type: 'qrCode',
  //   value: {
  //     text: 'Devterm',
  //     options: {
  //       errorCorrectionLevel: 'M',
  //       margin: 0,
  //       scale: 4,
  //       small: false
  //     },
  //     imageOptions: {
  //       rotate: false,
  //       flipX: false,
  //       flipY: false,
  //       width: null
  //     }
  //   }
  // },
  // { type: 'feedPitch', value: { value: 10, type: 'font' } },
  // { type: 'feedPitch', value: { value: 2, type: 'font' } },
  // {
  //   type: 'image',
  //   value: {
  //     file: devtermUri,
  //     imageOptions: {
  //       grayscale: true,
  //       rotate: false,
  //       flipX: false,
  //       flipY: false,
  //       width: 100
  //     }
  //   }
  // },
  // // { type: 'reset' },
  // // { type: 'cutLine' },

  // // { type: 'setFont', value: FONT.SIZE_8_16_THIN_1 },

  // // ...writeHeadline('Text:'),
  // // { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },

  // // // { type: 'text', value: 'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },

  // // { type: 'feedPitch', value: { value: 2, type: 'font' } },

  // ...writeHeadline('Align:'),

  // { type: 'setAlign', value: ALIGN.LEFT },
  // { type: 'text', value: 'Left' }
  // { type: 'setAlign', value: ALIGN.CENTER },
  // { type: 'text', value: 'Center' },
  // { type: 'setAlign', value: ALIGN.RIGHT },
  // { type: 'text', value: 'Right' },
  // { type: 'feedPitch', value: { value: 2, type: 'font' } }

  // ...writeHeadline('Align with 1/3 Margin:'),

  // { type: 'setMargin', value: 1 / 3 },
  // { type: 'setAlign', value: ALIGN.LEFT },
  // { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
  // { type: 'feedPitch', value: { value: 1, type: 'font' } },
  // { type: 'setAlign', value: ALIGN.CENTER },
  // { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
  // { type: 'feedPitch', value: { value: 1, type: 'font' } },
  // { type: 'setAlign', value: ALIGN.RIGHT },
  // { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },

  // ...writeHeadline('Word Gap:'),
  // ...Array(11).fill(0).map((v, index) => {
  //   return [
  //     { type: 'setWordGap', value: index },
  //     { type: 'text', value: `Word Gap ${index}px` }
  //   ];
  // }).flat(),

  // ...writeHeadline('Line Height:'),
  // ...Array(10).fill(0).map((v, index) => {
  //   const value = 16 + index * 2;
  //   return [
  //     { type: 'setLineSpace', value },
  //     { type: 'text', value: `Line Space ${value}px` }
  //   ];
  // }).flat(),

  // ...writeHeadline('Density:'),
  // ...Array(MAX_DENSITY).fill(0).map((v, index) => {
  //   return [
  //     { type: 'setDensity', value: index },
  //     { type: 'text', value: `Density ${index}` }
  //   ];
  // }).flat(),
  // { type: 'reset' },
  // { type: 'feedPitch', value: { value: 14, type: 'font' } }

  // // { type: 'setDensity', value: 15 },
  // // { type: 'text', value: 'Test 1 2 3' },
  // // { type: 'feedPitch', value: { value: 4, type: 'font' } },
  // // // { type: 'reset' },
  // // { type: 'cutLine' },
  // // { type: 'feedPitch', value: { value: 2, type: 'font' } }
  // // { type: 'setMargin', value: 1 / 3 },
  // // { type: 'setAlign', value: ALIGN.LEFT },
  // // { type: 'setAlign', value: ALIGN.CENTER },
  // // { type: 'text', value: '' },
  // // { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
  // // { type: 'text', value: '' },
  // // { type: 'setAlign', value: ALIGN.RIGHT },
  // // { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' }

  // // { type: 'text', value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.' }
  // // { type: 'setAlign', value: ALIGN.CENTER },
  // // { type: 'text', value: 'Test Text 2' },
  // // { type: 'setAlign', value: ALIGN.RIGHT },
  // // { type: 'text', value: 'Test Text 3' }
];
