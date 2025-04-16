"use strict";
const electron = require("electron");
const utils = require("@electron-toolkit/utils");
const path = require("path");
const electronUpdater = require("electron-updater");
const icon = path.join(__dirname, "../../resources/icon.ico");
const verifyDebugAndErrorsFile = (contextFile, type) => {
  const path2 = require("path");
  const fs = require("fs");
  const route = "C:/carDiHomologacao";
  const dir = "C:/carDiHomologacao/logs";
  const date = /* @__PURE__ */ new Date();
  const dateHours = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
  const dateToLocaleDateString = date.toLocaleDateString().replace(/\//g, "-");
  const logFile = path2.join(dir, `${type === 0 ? "errors" : "debug"}${dateToLocaleDateString}.txt`);
  if (!fs.existsSync(route)) {
    fs.mkdirSync(route);
  }
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (fs.existsSync(logFile)) {
    readAndWriteFile(logFile, contextFile, dateHours);
  } else {
    writeFile(logFile, contextFile, dateHours);
  }
};
const writeFile = (logFile, contextFile, dateHours) => {
  const fs = require("fs");
  let newContextFile = "";
  for (let i = 0; i < contextFile.length; i++) {
    newContextFile += contextFile[i];
    if ((i + 1) % 60 === 0) {
      newContextFile += "\n";
    }
  }
  fs.writeFileSync(`${logFile}`, `[ ${dateHours} ] - ${newContextFile}`);
  removeFiles();
};
const readAndWriteFile = (logFile, contextFile, dateHours) => {
  const fs = require("fs");
  fs.readFile(logFile, "utf8", function(err, data) {
    if (err) throw err;
    let newContextFile = `

[ ${dateHours} ] - `;
    for (let i = 0; i < contextFile.length; i++) {
      newContextFile += `${contextFile[i]}`;
      if ((i + 1) % 60 === 0) {
        newContextFile += "\n";
      }
    }
    const newContextFileDate = data + newContextFile;
    fs.writeFile(logFile, newContextFileDate, function(err2) {
      if (err2) throw err2;
      console.log("Conteúdo adicionado com sucesso!");
    });
  });
};
const removeFiles = () => {
  const path2 = require("path");
  const fs = require("fs");
  const dir = "C:/carDiHomologacao/logs";
  const currentDate = /* @__PURE__ */ new Date();
  const deleteAfterDays = 7;
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error("Erro ao ler o diretório:", err);
      return;
    }
    files.forEach((file) => {
      const filePath = path2.join(dir, file);
      fs.stat(filePath, (err2, stats) => {
        if (err2) {
          console.error("Erro ao obter as informações do arquivo:", err2);
          return;
        }
        const creationDate = stats.birthtime;
        const timeDiff = currentDate.getTime() - creationDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1e3 * 3600 * 24));
        if (daysDiff >= deleteAfterDays) {
          fs.unlink(filePath, (err3) => {
            if (err3) {
              console.error("Erro ao excluir o arquivo:", err3);
              return;
            }
            console.log("Arquivo excluído com sucesso:", filePath);
          });
        }
      });
    });
  });
};
electronUpdater.autoUpdater.autoDownload = false;
electronUpdater.autoUpdater.allowDowngrade = false;
electron.app.disableHardwareAcceleration();
function createWindow() {
  const gotTheLock = electron.app.requestSingleInstanceLock();
  if (!gotTheLock) {
    electron.app.quit();
  }
  const { join } = require("path");
  const mainWindow = new electron.BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    icon,
    resizable: true,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false,
      webgl: false,
      experimentalFeatures: false,
      plugins: false,
      nodeIntegrationInWorker: false,
      backgroundThrottling: true,
      spellcheck: false,
      nodeIntegrationInSubFrames: false
    }
  });
  electron.ipcMain.handle("openDevTools", () => {
    mainWindow.webContents.openDevTools();
  });
  electron.ipcMain.handle("flashNotification", () => {
    mainWindow.flashFrame(true);
    mainWindow.once("focus", () => mainWindow.flashFrame(false));
  });
  electron.ipcMain.handle("minimizeWindow", () => mainWindow.minimize());
  electron.ipcMain.handle("toggleMaximizeWindow", () => {
    if (mainWindow.isMaximized()) mainWindow.unmaximize();
    else mainWindow.maximize();
  });
  electron.ipcMain.handle("closeWindow", () => mainWindow.close());
  mainWindow.webContents.once("did-finish-load", async () => {
    mainWindow.maximize();
    mainWindow.show();
    mainWindow.focus();
    removeFiles();
    if (utils.is.dev) mainWindow.webContents.openDevTools();
  });
  mainWindow.webContents.on("console-message", (_event, level, message, line, sourceId) => {
    verifyDebugAndErrorsFile(
      `[${level === 1 ? "Desenvolvedor" : level === 2 ? "Electron" : "Warning"} - ${level}] - ${message} (${sourceId}:${line})`,
      1
    );
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"), { hash: "/" });
  }
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.cardi.homologacao");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("ping", () => console.log("pong"));
  electron.ipcMain.handle("logDebugAndError", (_, err) => {
    verifyDebugAndErrorsFile(err[0].message, err[0].type);
  });
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  electron.app.on("second-instance", () => {
    const allWindows = electron.BrowserWindow.getAllWindows();
    if (allWindows.length > 0) {
      allWindows[0].focus();
    } else {
      createWindow();
    }
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
