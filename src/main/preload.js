const{contextBridge,ipcRenderer}=require('electron');contextBridge.exposeInMainWorld('amnesia',{ping:msg=>ipcRenderer.invoke('ping',msg)});
