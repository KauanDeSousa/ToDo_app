"use strict";
const electron = require("electron");
if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow");
}
try {
  electron.contextBridge.exposeInMainWorld("context", {
    minimizeWindow: () => electron.ipcRenderer.invoke("minimizeWindow"),
    toggleMaximizeWindow: () => electron.ipcRenderer.invoke("toggleMaximizeWindow"),
    closeWindow: () => electron.ipcRenderer.invoke("closeWindow"),
    on: (channel, callback) => {
      electron.ipcRenderer.on(channel, (_event, ...args) => callback(...args));
    },
    off: (channel) => {
      electron.ipcRenderer.removeAllListeners(channel);
    }
  });
} catch (error) {
  console.error(error);
}
