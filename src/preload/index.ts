import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

if (!process.contextIsolated) {
    throw new Error('contextIsolation must be enabled in the BrowserWindow');
}

try {
    contextBridge.exposeInMainWorld('context', {
        minimizeWindow: () => ipcRenderer.invoke('minimizeWindow'),
        toggleMaximizeWindow: () => ipcRenderer.invoke('toggleMaximizeWindow'),
        closeWindow: () => ipcRenderer.invoke('closeWindow'),
        on: (channel: string, callback: (...args: any[]) => void) => {
            ipcRenderer.on(channel, (_event: IpcRendererEvent, ...args: any[]) => callback(...args));
        },
        off: (channel: string) => {
            ipcRenderer.removeAllListeners(channel);
        },
    });
} catch (error) {
    console.error(error);
}
