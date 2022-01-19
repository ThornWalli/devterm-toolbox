
const { app, BrowserWindow } = require('electron');
const { join } = require('upath');
const isDev = process.env.NODE_ENV === 'development';

const createWindow = (server) => {
  const mainWindow = new BrowserWindow({
    title: app.getName(),
    width: 1280,
    height: 480,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true,
      webSecurity: false,
      contextIsolation: true
    }
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.removeMenu();
  }

  if (isDev) {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }

  mainWindow.on('closed', () => {
    server && server.stop();

    if (!isDev && (((server && (server.disabled || !server.active))) && BrowserWindow.getAllWindows().length === 0)) {
      app.exit();
    }
  });

  return mainWindow;
};

module.exports = {
  createWindow
};
