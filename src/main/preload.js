// src/main/preload.js
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('amnesia', {
  ping: () => 'pong'
})
