// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ping existente
ipcMain.handle('ping', async (_evt, msg) => `pong: ${msg}`);

// bridge HTTP: renderer -> main -> axios (sin CORS)
const DEFAULT_TIMEOUT = 15000;

ipcMain.handle('http:req', async (_evt, { method, url, body, headers, timeout, insecure }) => {
  try {
    // hay payload solamente si body !== undefined
    const hasPayload = typeof body !== 'undefined';

    const agent = insecure ? new https.Agent({ rejectUnauthorized: false }) : undefined;

    const res = await axios({
      method,
      url,
      // solo incluye data si hay payload
      ...(hasPayload ? { data: body } : {}),
      // solo incluye headers si hay payload (o si tú mandaste algo explícitamente)
      ...(headers && Object.keys(headers).length ? { headers } : {}),
      timeout: timeout || DEFAULT_TIMEOUT,
      httpsAgent: agent,
      // evita que axios serialice 'undefined' a 'null'
      transformRequest: [(data, hdrs) => {
        if (typeof data === 'undefined') {
          // delete Content-Type si quedó colgado
          if (hdrs && hdrs['Content-Type']) delete hdrs['Content-Type'];
          return undefined;
        }
        return typeof data === 'string' ? data : JSON.stringify(data);
      }],
    });

    return { ok:true, status:res.status, data:res.data, headers:res.headers };
  } catch (err) {
    const code = err.code || (err.cause && err.cause.code);
    const msg  = err.message;

    if (err.response) {
      const data = typeof err.response.data === 'string' ? err.response.data : err.response.data;
      return { ok:false, status:err.response.status, data, headers:err.response.headers || {}, error:null };
    }

    return {
      ok:false,
      status:0,
      data:'NETWORK',
      headers:{},
      error:{ code:code||null, message:msg||'Network error' }
    };
  }
});
