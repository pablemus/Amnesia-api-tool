// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('amnesia', {
  // ya lo tenías
  ping: (msg) => ipcRenderer.invoke('ping', msg),

  // nuevo: requests sin CORS a través del proceso main
  request: (method, url, body /* puede ser undefined */, headers = {}, opts = {}) =>
    ipcRenderer.invoke('http:req', { method, url, body, headers, ...opts }),
});
