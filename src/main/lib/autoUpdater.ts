import { autoUpdater } from 'electron-updater';
import { verifyDebugAndErrorsFile } from './debugs';
import { ipcMain } from 'electron';

autoUpdater.autoDownload = false;
autoUpdater.allowDowngrade = false;

let isDownloading = false;
let listenersConfigured = false;

const setupAutoUpdaterListeners = (mainWindow) => {
    if (listenersConfigured) return; // Evita duplicação de eventos
    listenersConfigured = true;

    ipcMain.handle('downloadUpdate', () => {
        if (!isDownloading) {
            console.log('Iniciando download da atualização...');
            isDownloading = true;
            autoUpdater.downloadUpdate();
        } else {
            console.log('Download já está em andamento.');
        }
    });

    autoUpdater.on('update-available', (info) => {
        verifyDebugAndErrorsFile('Atualização disponível: ' + info.version, 1);
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('statusUpdate', 'Atualização disponível: ' + info.version);
        }

        if (!isDownloading) {
            console.log('Iniciando download da atualização...');
            isDownloading = true;
            autoUpdater.downloadUpdate();
        }
    });

    autoUpdater.on('update-not-available', () => {
        verifyDebugAndErrorsFile('Nenhuma atualização disponível.', 1);
    });

    autoUpdater.on('error', (error) => {
        verifyDebugAndErrorsFile('Erro ao verificar/atualizar: ' + error, 1);
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('statusUpdate', 'Erro ao buscar atualização.');
        }
    });

    autoUpdater.on('download-progress', (progressObj) => {
        verifyDebugAndErrorsFile(`Download em progresso: ${progressObj.percent.toFixed(2)}%`, 1);
    });

    autoUpdater.on('update-downloaded', (info) => {
        isDownloading = false;
        verifyDebugAndErrorsFile('Atualização baixada: ' + info.version, 1);
        setTimeout(() => {
            autoUpdater.quitAndInstall(true, true);
        }, 3000);
    });
};

export const checkAutoUpdater = (mainWindow, _initializingApp = false) => {
    return new Promise((resolve) => {
        setupAutoUpdaterListeners(mainWindow);
        autoUpdater.checkForUpdates();

        let resolved = false;

        const resolveOnce = (value) => {
            if (!resolved) {
                resolved = true;
                resolve(value);
            }
        };

        autoUpdater.once('update-available', () => {
            resolveOnce(true);
        });

        autoUpdater.once('update-not-available', () => {
            resolveOnce(false);
        });

        autoUpdater.once('error', (error) => {
            verifyDebugAndErrorsFile('Erro ao verificar/atualizar: ' + error, 1);
            resolveOnce(false);
        });
    });
};
