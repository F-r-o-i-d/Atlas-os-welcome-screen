const electron = require('electron');
const url = require('url');
const path = require('path');
const os = require('os');
const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

//c

app.on('ready', () => {

  mainWindow = new BrowserWindow({
    // width: width,
    // height: height,
    //hide menu bar
    autoHideMenuBar: true,
    fullscreen: true,
    
    webPreferences: { nodeIntegration: true,
      // alwaysOnTop: true,
      contextIsolation: false,
      nativeWindowOpen: true,
      enableRemoteModule: true,
      sandbox:false,
      nodeIntegrationInSubFrames:true, //for subContent nodeIntegration Enable
      webviewTag:true //for webView,
    },
    preload: path.join(__dirname, 'src/preload.js')
    
  });

  if (os.platform() != 'win32') {
    mainWindow.webContents.openDevTools();
  }
  // mainWindow.setAlwaysOnTop(true, "floating");
  // mainWindow.setVisibleOnAllWorkspaces(true);
  // mainWindow.setFullScreenable(false);

  mainWindow.loadURL(url.format({
    // All this is doing is passing in to file://your_directory/src/index.html
    pathname: path.join(__dirname, 'src/index.html'),
    //allow dev tools
    protocol: 'file:',
    slashes: true
  }));

  // Shut down app when window closes
  mainWindow.on('closed', () => app.quit()); 

  const mainMenu = Menu.buildFromTemplate(menuBar);
  Menu.setApplicationMenu(mainMenu);

});