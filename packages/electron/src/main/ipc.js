
const fs = require('fs');
const { resolve } = require('path');
const { app, ipcMain, dialog, BrowserWindow } = require('electron');
const { updateTrayIcon } = require('./tray');

const registerWindow = window => {
  window.addListener('enter-full-screen', () => {
    window.webContents.send('window', 'fullscreen', true);
  });
  window.addListener('leave-full-screen', () => {
    window.webContents.send('window', 'fullscreen', false);
  });
};

const ipc = (server) => {
  ipcMain.handle('startServer', async (event, port, ssl) => {
    console.log(port, ssl);
    try {
      await server.start(port, ssl);
      return { ...server.toJSON() };
    } catch (error) {
      server.stop();
      return error;
    }
  });

  ipcMain.handle('getCurrentVersion', (event) => {
    return app.getVersion();
  });
  ipcMain.handle('stopServer', (event) => {
    return server.stop();
  });
  ipcMain.handle('getServerOptions', (event) => {
    return getServerOptions(server);
  });
  ipcMain.handle('serverSupported', (event) => {
    return server.supported();
  });

  const userDataPath = app.getPath('userData');
  const configFile = resolve(userDataPath, 'config.json');

  // Load config
  const onLoadConfig = async (event) => {
    try {
      return JSON.parse(await fs.promises.readFile(configFile, 'utf-8'));
    } catch (error) {
      return null;
    }
  };
  ipcMain.handle('loadConfig', onLoadConfig);

  // Save config
  const onSaveConfig = (event, data) => {
    fs.promises.writeFile(configFile, JSON.stringify(data), 'utf-8');
  };
  ipcMain.handle('saveConfig', onSaveConfig);

  const onClient = (event, type, value) => {
    switch (type) {
      case 'connect':
        updateTrayIcon({ remote: value });
        break;

      default:
        break;
    }
  };
  ipcMain.handle('client', onClient);

  // Window
  const onWindow = (event, type, value) => {
    const window = BrowserWindow.getFocusedWindow();
    switch (type) {
      case 'minimize':
        window.minimize();
        break;
      case 'maximize':
        window.maximize();
        break;
      case 'fullscreen':
        window.setFullScreen(value && !window.isFullScreen());
        break;
    }
  };
  ipcMain.handle('window', onWindow);

  // Close
  const onClose = (event) => {
    app.exit();
  };
  ipcMain.handle('close', onClose);

  // Save
  const onSave = (event, data) => {
    return dialog.showSaveDialog({
      title: 'Save template',
      defaultPath: 'template.json',
      buttonLabel: 'Save',
      filters: [
        {
          name: 'JSON',
          extensions: ['json']
        }],
      properties: []
    }).then(async ({ canceled, filePath }) => {
      if (!canceled) {
        await fs.promises.writeFile(filePath.toString(), JSON.stringify(data));
      }
    }).catch(err => {
      console.error(err);
    });
  };
  ipcMain.handle('save', onSave);

  // Load
  const onLoad = async (event) => {
    const data = await dialog.showOpenDialog({
      title: 'Load template',
      // defaultPath: 'template.json',
      buttonLabel: 'Save',
      filters: [
        {
          name: 'JSON',
          extensions: ['json']
        }],
      properties: [
        'openFile'
      ]
    }).then(async ({ canceled, filePaths }) => {
      if (!canceled) {
        return JSON.parse(await fs.promises.readFile(filePaths.toString(), 'utf-8'));
      }
      return null;
    }).catch(err => {
      console.error(err);
    });
    return data;
  };
  ipcMain.handle('load', onLoad);
};

const getServerOptions = (server) => {
  return {
    active: server.active,
    port: server.port,
    hosts: server.hosts,
    ssl: server.ssl,
    secure: server.secure,
    activeSessions: server.sockets.size
  };
};

module.exports = { registerWindow, default: ipc };
