const Path = require('path');
const { app, BrowserWindow } = require('electron');
const Server = require('./classes/Server').default;
const isDev = process.env.NODE_ENV === 'development';

const server = new Server();

const ipcControl = require('./ipc').default(server);

function createWindow () {
  const mainWindow = new BrowserWindow({
    title: app.getName(),
    width: 1280,
    height: 480,
    webPreferences: {
      preload: Path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      webSecurity: false,
      contextIsolation: true
    }
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  if (isDev) {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(Path.join(app.getAppPath(), 'renderer', 'index.html'));
  }

  mainWindow.on('closed', () => {
    server && server.stop();
  });

  mainWindow.on('show', () => {
    ipcControl.registerWindowEvents(mainWindow);
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
