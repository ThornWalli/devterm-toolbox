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

export const getFonts = () => {
  if (isElectron()) {
    return window.electron.ipcRenderer.invoke('getFonts');
  } else {
    const generateDefaults = () => {
      const variants = [];
      const italics = [false, true];
      const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
      for (let x = 0; x < italics.length; x++) {
        for (let y = 0; y < weights.length; y++) {
          variants.push({ weight: weights[y], italic: italics[x] });
        }
      }
      return variants;
    };
    const variants = generateDefaults();
    return [
      { family: 'Arial', monospace: false, variants },
      { family: 'Verdana ', monospace: false, variants },
      { family: 'Helvetica ', monospace: false, variants },
      { family: 'Tahoma ', monospace: false, variants },
      { family: 'Trebuchet MS ', monospace: false, variants },
      { family: 'Times New Roman ', monospace: false, variants },
      { family: 'Georgia ', monospace: false, variants },
      { family: 'Garamond ', monospace: false, variants },
      { family: 'Courier New ', monospace: true, variants },
      { family: 'Brush Script MT ', monospace: false, variants },
      { family: 'sans-serif', monospace: false, variants },
      { family: 'monospace ', monospace: true, variants }
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
