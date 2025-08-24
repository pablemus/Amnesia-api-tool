// electron/main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Amnesia',
    backgroundColor: '#0f1014',
    show: false, // evita flash blanco
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.once('ready-to-show', () => win.show());

  if (isDev) {
    // tu dev server del renderer
    win.loadURL('http://localhost:3000').catch(console.error);
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    // apunta al index.html generado por webpack renderer
    const indexPath = path.resolve(__dirname, '..', 'renderer', 'index.html');
    win.loadFile(indexPath).catch(console.error);
  }

  return win;
}

// (opcional pero recomendado) una sola instancia
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    const win = BrowserWindow.getAllWindows()[0];
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });
}

app.setAppUserModelId('com.pablo.amnesia'); // Windows notifications/Taskbar

app.whenReady().then(() => {
  if (isDev) process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
