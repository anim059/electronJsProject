const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')
const fs = require('fs');
const { resolve } = require('path');
const { reject, result } = require('lodash');

let userdata = {};



//createing main process window which width and height 1000//
function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
  
  //main process handle "dark-mode:toggle" channel for dark and system mode//  

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


// when Electron has finished initializing this event will called
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
// when all the window is closed the the main application will be quit//
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


//this inter process communication handle 'fetch-user-data' channel  for createing new user//
ipcMain.on('create-user-data',(event,args)=>{
  let pathName = path.join(__dirname,"userinfo.txt");
  let value = JSON.stringify(args);
  
  if (fs.readFileSync(pathName).length === 0) {
    fs.appendFile(pathName,value+'\n','utf8',function(err){
      if(err){
        return err;
      }
      console.log("the file is created where file is empty");
    })
  }else{
    let newvalue =  value + '\n' 
    fs.appendFile(pathName,newvalue,'utf8',function(err){
      if(err){
        return err;
      }
      console.log("the file is created ");
    })
  } 

  
  console.log(pathName)
})


//this inter process communication handle 'read-user-data' channel  for reading all users and return as a promise with //
// all user info
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

// /this inter process communication handle 'search-user-data' channel  for searching a specifice user  //
ipcMain.handle("search-user-data", (event, argx = 0) => {
  return new Promise((resolve, reject) => {
    let pathName = path.join(__dirname,"userinfo.txt");
    fs.readFile(pathName, "utf8", function (err, data) {
      if (err) {
        reject(err);
        return;
      }
      const all_user_data = data.split("\n")
      for(var i=0;i<all_user_data.length;i++){
        const json_data = JSON.parse(all_user_data[i])
        if(json_data["id"]==argx){
          resolve(json_data);
          break;
        }

      }
    });
  });
});


//this inter process communication handle 'read-user-data' channel  for updating a specifice user //
ipcMain.on('update-user-data',(event,args)=>{
  let pathName = path.join(__dirname,"userinfo.txt");
  let value = JSON.stringify(args);
  
  
  if (fs.readFileSync(pathName).length !== 0) {
   
    fs.readFile(pathName, "utf8", function (err, data) {
      if (err) {
        return;
      }
       let Newvalue = JSON.parse(value)
       const all_user_data = data.split("\n")
       for(var i=0;i<all_user_data.length;i++){
        const json_data = JSON.parse(all_user_data[i])
        if(json_data["id"]==Newvalue["id"]){
          const result = data.replace(all_user_data[i],JSON.stringify(Newvalue))
          fs.writeFile(pathName, result, 'utf8', function (err) {
                   if (err) return console.log(err);
          });
          console.log(result)
          break
        }
       }

    });
  }

})




//this inter process communication handle 'read-user-data' channel  for deleting a specifice user //
ipcMain.on('delete-user-data',(event,args)=>{
  let pathName = path.join(__dirname,"userinfo.txt");
 
  if (fs.readFileSync(pathName).length !== 0) {
   
    fs.readFile(pathName, "utf8", function (err, data) {
      if (err) {
        return;
      }

       const all_user_data = data.split("\n")
       for(var i=0;i<all_user_data.length;i++){
        const json_data = JSON.parse(all_user_data[i])
        if(json_data["id"]==args){
          let result = data.replace(all_user_data[i]+'\n',"")
           fs.writeFile(pathName, result, 'utf8', function (err) {
                    if (err) return console.log(err);
           });
          console.log(result)
          break
        }
       }

    });
  }

})