
const { Tray, Menu, nativeTheme } = require('electron');
const { join } = require('upath');

const isMac = process.platform === 'darwin';

let mainWindow;
const registerWindow = window => {
  window.on('close', () => (mainWindow = null));
  mainWindow = window;
};

const getMainWindow = async () => {
  const window = mainWindow || await _createMainWindow();
  return window;
};

let tray = null; let _createMainWindow = null;
const createTray = (server, { createMainWindow }) => {
  _createMainWindow = createMainWindow;
  tray = new Tray(getTrayIcon());
  // tray.setPressedImage(getTrayIcon()));
  const contextMenu = Menu.buildFromTemplate(getMenuItems());

  // Call this again for Linux because we modified the context menu
  tray.setContextMenu(contextMenu);

  nativeTheme.on('updated', () => {
    updateTrayIcon();
  });

  server.on('start', () => {
    tray.setImage(getTrayIcon({ server: true }));
  });
  server.on('stop', () => {
    tray.setImage(getTrayIcon({ server: false }));
  });

  return tray;
};

const getMenuItems = () => {
  return [
    {
      label: 'Show…',
      type: 'normal',
      click () {
        if (mainWindow) {
          mainWindow.focus();
        } else {
          _createMainWindow();
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Remote…',
      type: 'normal',
      async click () {
        const window = (await getMainWindow());
        global.setTimeout(() => {
          window.webContents.send('dialog', 'open', 'remote');
        }, 500);
      }
    },
    {
      label: 'Server…',
      type: 'normal',
      async click () {
        const window = (await getMainWindow());
        global.setTimeout(() => {
          window.webContents.send('dialog', 'open', 'server');
        }, 500);
      }
    },
    { type: 'separator' },
    {
      label: 'Options…',
      type: 'normal',
      async click () {
        const window = (await getMainWindow());
        global.setTimeout(() => {
          window.webContents.send('dialog', 'open', 'options');
        }, 500);
      }
    },
    { type: 'separator' },
    { role: 'quit' }
  ];
};

let trayIconOptions = { server: false, remote: false };
const setTrayOptions = (options = {}) => (trayIconOptions = { ...trayIconOptions, ...options });
const updateTrayIcon = (options = {}) => {
  options = setTrayOptions(options);
  tray.setImage(getTrayIcon(options));
};
const getTrayIcon = (options = {}) => {
  options = setTrayOptions(options);
  let type;
  if (options.server && options.remote) {
    type = 'online';
  } else if (options.server && !options.remote) {
    type = 'server-online';
  } else if (!options.server && options.remote) {
    type = 'remote-online';
  } else {
    type = 'offline';
  }

  let color = 'default';
  if (isMac) {
    if (nativeTheme.shouldUseDarkColors) {
      color = 'dark';
    } else {
      color = 'light';
    }
  }
  return join(__dirname, `assets/icon-${type}-${color}/icons/png/16x16.png`);
};

module.exports = {
  registerWindow, createTray, updateTrayIcon
};
