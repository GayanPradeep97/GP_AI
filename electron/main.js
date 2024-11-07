const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");
const path = require("path");
const url = require("url");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"), // Add a preload script
    },
  });

  const indexPath = url.format({
    pathname: path.join(__dirname, "../dist/image-to-text/browser/index.html"),
    protocol: "file:",
    slashes: true,
  });

  console.log("Loading URL:", indexPath);
  mainWindow.loadURL(indexPath);
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Dark mode toggle handler
ipcMain.handle("dark-mode:toggle", () => {
  nativeTheme.themeSource = nativeTheme.shouldUseDarkColors ? "light" : "dark";
  return nativeTheme.shouldUseDarkColors;
});

// Dark mode system default handler
ipcMain.handle("dark-mode:system", () => {
  nativeTheme.themeSource = "system";
});
