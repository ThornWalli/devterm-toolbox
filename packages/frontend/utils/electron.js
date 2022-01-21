import { selectFiles } from './dom';

export const registerClient = (client) => {
  if (isElectron()) {
    client.on('connect', () => {
      window.electron.ipcRenderer.invoke('client', 'connect', true);
    });
    client.on('disconnect', () => {
      window.electron.ipcRenderer.invoke('client', 'connect', false);
    });
  }
};

export const minimizeWindow = () => {
  window.electron.ipcRenderer.invoke('window', 'minimize');
};

export const maximizeWindow = () => {
  window.electron.ipcRenderer.invoke('window', 'maximize');
};

export const fullscreenWindow = (value) => {
  if (isElectron()) {
    window.electron.ipcRenderer.invoke('window', 'fullscreen', value);
  } else if (!value) {
    return document.exitFullscreen();
  } else {
    return document.body.requestFullscreen();
  }
};

export const closeWindow = () => {
  window.electron.ipcRenderer.invoke('close');
};

export const isElectron = () => {
  return 'electron' in window;
};

export const templateSave = (template) => {
  if (isElectron()) {
    return window.electron.ipcRenderer.invoke('save', template);
  } else {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(template));
    const el = document.createElement('a');
    el.setAttribute('href', dataStr);
    el.setAttribute('download', 'scene.json');
    el.click();
  }
};

export const templateLoad = async () => {
  if (isElectron()) {
    return window.electron.ipcRenderer.invoke('load');
  } else {
    const files = await selectFiles('text', ['application/json']);
    return new Promise((resolve, reject) => {
      if (files.length) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          try {
            resolve(JSON.parse(reader.result));
          } catch (error) {
            reject(error);
          }
        });
        reader.readAsText(files[0]);
      } else {
        resolve();
      }
    });
  }
};

export const listenDialogOpen = (cb) => {
  if (isElectron()) {
    window.electron.ipcRendererReceive('dialog', cb);
  }
};

export const listenFullscreenChange = (cb) => {
  if (isElectron()) {
    window.electron.ipcRendererReceive('window', (type, value) => {
      switch (type) {
        case 'fullscreen':
          cb(value);
          break;
      }
    });
  } else {
    window.addEventListener('fullscreenchange', () => {
      cb(document.fullscreenEnabled);
    });
  }
};

export const loadConfig = () => {
  if (isElectron()) {
    return window.electron.ipcRenderer.invoke('loadConfig');
  } else {
    return JSON.parse(window.localStorage.getItem('config'));
  }
};

export const saveConfig = config => {
  if (isElectron()) {
    return window.electron.ipcRenderer.invoke('saveConfig', config);
  } else {
    return window.localStorage.setItem('config', JSON.stringify(config));
  }
};

export const getVersion = () => {
  if (isElectron()) {
    return window.electron.ipcRenderer.invoke('getCurrentVersion');
  } else {
    // eslint-disable-next-line no-undef
    return __VERSION__;
  }
};

export const getFonts = async () => {
  const generateDefaults = () => {
    const variants = [];
    const italics = [false, true];
    const weights = [400, 500, 600, 700, 800, 900];
    for (let x = 0; x < italics.length; x++) {
      for (let y = 0; y < weights.length; y++) {
        variants.push({ weight: weights[y], italic: italics[x] });
      }
    }
    return variants;
  };
  const variants = generateDefaults();
  const defaultFonts = [
    { group: 'DevTerm', value: '"5x7-ISO8859-1"', name: '5x7-ISO8859-1', variants: [] },
    { group: 'DevTerm', value: '"6x12-ISO8859-1"', name: '6x12-ISO8859-1', variants: [] },
    { group: 'DevTerm', value: '"7x14-ISO8859-1"', name: '7x14-ISO8859-1', variants: [] },
    { group: 'DevTerm', value: '"Px437_CompaqThin_8x16"', name: 'Px437_CompaqThin_8x16', variants: [] },
    { group: 'Web', value: 'sans-serif', name: 'Sans-serif', monospace: false, variants },
    { group: 'Web', value: 'serif', name: 'Serif', monospace: false, variants },
    { group: 'Web', value: 'monospace', name: 'Monospace', monospace: true, variants },
    { group: 'Web', value: 'fantasy', name: 'Fantasy', monospace: false, variants },
    { group: 'Web', value: 'cursive', name: 'Cursive', monospace: false, variants }
  ];

  if (isElectron()) {
    return defaultFonts.concat(await window.electron.ipcRenderer.invoke('getFonts'));
  } else {
    return [
      ...defaultFonts,
      { group: 'System', value: '"Arial"', name: 'Arial', monospace: false, variants },
      { group: 'System', value: '"Verdana"', name: 'Verdana', monospace: false, variants },
      { group: 'System', value: '"Helvetica"', name: 'Helvetica', monospace: false, variants },
      { group: 'System', value: '"Tahoma"', name: 'Tahoma', monospace: false, variants },
      { group: 'System', value: '"Trebuchet MS"', name: 'Trebuchet MS', monospace: false, variants },
      { group: 'System', value: '"Times New Roman"', name: 'Times New Roman', monospace: false, variants },
      { group: 'System', value: '"Georgia"', name: 'Georgia', monospace: false, variants },
      { group: 'System', value: '"Garamond"', name: 'Garamond', monospace: false, variants },
      { group: 'System', value: '"Courier New"', name: 'Courier New', monospace: true, variants },
      { group: 'System', value: '"Brush Script MT"', name: 'Brush Script MT', monospace: false, variants }
    ];
  }
};

export const startServer = (port, ssl) => {
  return window.electron.ipcRenderer.invoke('startServer', port, ssl);
};
export const stopServer = () => {
  return window.electron.ipcRenderer.invoke('stopServer');
};

export const getServerOptions = () => {
  return window.electron.ipcRenderer.invoke('getServerOptions');
};

export const serverSupported = () => {
  return window.electron.ipcRenderer.invoke('serverSupported');
};
