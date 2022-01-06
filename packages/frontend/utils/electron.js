
export const minimizeWindow = () => {
  window.electron.ipcRenderer.invoke('window', 'minimize');
};

export const maximizeWindow = () => {
  window.electron.ipcRenderer.invoke('window', 'maximize');
};

export const fullscreenWindow = (value) => {
  if (isElectron()) {
    window.electron.ipcRenderer.invoke('window', 'fullscreen', !value);
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

export const templateLoad = () => {
  if (isElectron()) {
    return window.electron.ipcRenderer.invoke('load');
  } else {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.click();
      input.addEventListener('change', ({ target }) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          try {
            resolve(JSON.parse(reader.result));
          } catch (error) {
            reject(error);
          }
        });
        reader.readAsText(target.files[0]);
        input.remove();
      });
    });
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

export const startServer = port => {
  return window.electron.ipcRenderer.invoke('startServer', port);
};
export const stopServer = () => {
  return window.electron.ipcRenderer.invoke('stopServer');
};

export const getServerOptions = () => {
  return window.electron.ipcRenderer.invoke('getServerOptions');
};
