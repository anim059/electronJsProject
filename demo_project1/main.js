const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')
const fs = require('fs');
const { resolve } = require('path');
const { reject } = require('lodash');

let userdata = {};




function createWindow () {
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    //frame : false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')

  ipcMain.handle('dark-mode:toggle', (event) => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

 ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })


}

setTimeout(()=>{
  console.log("false");
  if(app.isReady){
    console.log("true");
  }
},2000);

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('fetch-user-data',(event,args)=>{
  let pathName = path.join(__dirname,"userinfo.txt");
  let value = JSON.stringify(args);

  fs.appendFile(pathName,value,'utf8',function(err){
    if(err){
      return console.log(err);
    }
    console.log("the file is created");
  })
  console.log(pathName)
})


// main
ipcMain.handle("read-user-data", (event, argx = 0) => {
  return new Promise((resolve, reject) => {
    let pathName = path.join(__dirname,"userinfo.txt");
    fs.readFile(pathName, "utf8", function (err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
});
