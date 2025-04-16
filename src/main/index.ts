import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.ico?asset';
import { verifyDebugAndErrorsFile, removeFiles } from './lib';
import { LogDebugAndError } from '@shared/types';

app.disableHardwareAcceleration();

function createWindow(): void {
    const gotTheLock = app.requestSingleInstanceLock();

    if (!gotTheLock) {
        app.quit();
    }

    const { join } = require('path');

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        show: false,
        frame: false,
        autoHideMenuBar: true,
        icon,
        resizable: true,
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
            contextIsolation: true,
            nodeIntegration: false,
            webgl: false,
            experimentalFeatures: false,
            plugins: false,
            nodeIntegrationInWorker: false,
            backgroundThrottling: true,
            spellcheck: false,
            nodeIntegrationInSubFrames: false,
        },
    });

    ipcMain.handle('openDevTools', () => {
        mainWindow.webContents.openDevTools();
    });

    ipcMain.handle('flashNotification', () => {
        mainWindow.flashFrame(true);
        mainWindow.once('focus', () => mainWindow.flashFrame(false));
    });

    ipcMain.handle('minimizeWindow', () => mainWindow.minimize());

    ipcMain.handle('toggleMaximizeWindow', () => {
        if (mainWindow.isMaximized()) mainWindow.unmaximize();
        else mainWindow.maximize();
    });

    ipcMain.handle('closeWindow', () => mainWindow.close());

    mainWindow.webContents.once('did-finish-load', async () => {
        // let updateAvailable;
        // if (!is.dev) updateAvailable = await checkAutoUpdater(mainWindow, true);

        // if (updateAvailable) {
        //     console.log('Atualização iniciada. O aplicativo será reiniciado após a instalação.');
        //     verifyDebugAndErrorsFile('Atualização iniciada. O aplicativo será reiniciado após a instalação.', 1);
        //     return;
        // }

        // setInterval(async () => {
        //     await checkAutoUpdater(mainWindow, false);
        // }, 1800000);
        mainWindow.maximize();
        mainWindow.show();
        mainWindow.focus();
        removeFiles(); // Função para remover arquivos, se necessário
        if (is.dev) mainWindow.webContents.openDevTools();
    });

    // ipcMain.handle('showApp', () => {
    //     windowLoadApp.destroy();
    //     mainWindow.show();
    //     mainWindow.focus();
    //     removeFiles(); // Função para remover arquivos, se necessário
    //     if (is.dev) mainWindow.webContents.openDevTools();
    // });

    mainWindow.webContents.on('console-message', (_event, level, message, line, sourceId) => {
        verifyDebugAndErrorsFile(
            `[${level === 1 ? 'Desenvolvedor' : level === 2 ? 'Electron' : 'Warning'} - ${level}] - ${message} (${sourceId}:${line})`,
            1
        );
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: '/' });
    }
}

// const loadApp = () => {
//     const windowLoadApp = new BrowserWindow({
//         width: 400,
//         height: 300,
//         autoHideMenuBar: true,
//         icon,
//         show: false,
//         frame: false,
//         resizable: false,
//         backgroundColor: '#ad0000',
//         webPreferences: {
//             sandbox: false,
//             contextIsolation: true,
//             nodeIntegration: false,
//             webgl: false,
//             experimentalFeatures: false,
//             plugins: false,
//             nodeIntegrationInWorker: false,
//             backgroundThrottling: true,
//             spellcheck: false,
//             nodeIntegrationInSubFrames: false,
//         },
//     });

//     windowLoadApp.loadFile(load);

//     return windowLoadApp;
// };

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.cardi.homologacao');

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });

    // IPC test
    ipcMain.on('ping', () => console.log('pong'));

    ipcMain.handle('logDebugAndError', (_, err: Parameters<LogDebugAndError>) => {
        verifyDebugAndErrorsFile(err[0].message, err[0].type);
    });

    createWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    app.on('second-instance', () => {
        const allWindows = BrowserWindow.getAllWindows();

        if (allWindows.length > 0) {
            // Focus on the first window (you can customize this logic)
            allWindows[0].focus();
        } else {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
