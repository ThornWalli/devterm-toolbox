
const { app, BrowserWindow } = require('electron');
const Server = require('./classes/Server').default;
const { createTray } = require('./tray');
const { createWindow } = require('./window');
const { registerWindow: trayRegisterWindow } = require('./tray');
const { default: ips, registerWindow: ipcRegisterWindow } = require('./ipc');

const server = new Server();
ips(server);

const createMainWindow = () => {
  return new Promise(resolve => {
    const mainWindow = createWindow();

    mainWindow.on('show', () => {
      trayRegisterWindow(mainWindow);
      ipcRegisterWindow(mainWindow);
      resolve(mainWindow);
    });
  });
};

app.whenReady().then(() => {
  createMainWindow();
  createTray(server, {
    createMainWindow
  });

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
