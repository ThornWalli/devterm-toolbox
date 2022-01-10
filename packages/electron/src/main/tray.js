
const { Tray, Menu, nativeTheme } = require('electron');
const { join } = require('upath');

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

  if (process.platform === 'win32') {
    tray.on('click', tray.popUpContextMenu);
  }

  tray.setToolTip('This is my application.');
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
  let path, type;
  if (options.server && options.remote) {
    type = 'online';
  } else if (options.server && !options.remote) {
    type = 'server-online';
  } else if (!options.server && options.remote) {
    type = 'remote-online';
  } else {
    type = 'offline';
  }
  if (process.platform === 'win32') {
    path = `${type}-light/icons/win/icon.ico`;
  } else if (nativeTheme.shouldUseDarkColors) {
    path = `${type}-dark/icons/png/16x16.png`;
  } else {
    path = `${type}-light/icons/png/16x16.png`;
  }
  return join(__dirname, `assets/icon-${path}`);
};

module.exports = {
  registerWindow, createTray, updateTrayIcon
};
