
const fs = require('fs');
const { resolve } = require('path');
const { app, ipcMain, dialog, BrowserWindow } = require('electron');
const esmRequire = require('esm')(module);
const { getDefaultConfig } = esmRequire('../../../frontend/utils/config');

const ipc = (server, options) => {
  ipcMain.handle('startServer', async (event, port) => {
    try {
      return await server.start(port);
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

  const userDataPath = app.getPath('userData');
  const configFile = resolve(userDataPath, 'config.json');

  ipcMain.handle('loadConfig', async (event) => {
    try {
      return JSON.parse(await fs.promises.readFile(configFile, 'utf-8'));
    } catch (error) {
      return getDefaultConfig();
    }
  });

  ipcMain.handle('saveConfig', (event, data) => {
    fs.promises.writeFile(configFile, JSON.stringify(data), 'utf-8');
  });

  ipcMain.handle('window', (event, type, value) => {
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
  });
  ipcMain.handle('close', (event) => {
    app.exit();
  });

  ipcMain.handle('save', (event, data) => {
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
  });

  ipcMain.handle('load', async (event) => {
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
  });

  return {
    registerWindowEvents: (window) => {
      window.addListener('enter-full-screen', () => {
        window.webContents.send('window', 'fullscreen', true);
      });
      window.addListener('leave-full-screen', () => {
        window.webContents.send('window', 'fullscreen', false);
      });
    }
  };
};

const getServerOptions = (server) => {
  return {
    active: server.active,
    port: server.port,
    hosts: server.hosts,
    activeSessions: server.sockets.size
  };
};

module.exports = { default: ipc };
