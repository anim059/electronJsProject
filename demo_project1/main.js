const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')
const fs = require('fs');
const { resolve } = require('path');
const { reject, result } = require('lodash');

let userdata = {};




function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
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

// main
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



ipcMain.on('update-user-data',(event,args)=>{
  let pathName = path.join(__dirname,"userinfo.txt");
  let value = JSON.stringify(args);
  
  
  if (fs.readFileSync(pathName).length !== 0) {
   
    fs.readFile(pathName, "utf8", function (err, data) {
      if (err) {
        return;
      }

       console.log(value)
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


ipcMain.on('delete-user-data',(event,args)=>{
  let pathName = path.join(__dirname,"userinfo.txt");
 
  
  
  if (fs.readFileSync(pathName).length !== 0) {
   
    fs.readFile(pathName, "utf8", function (err, data) {
      if (err) {
        return;
      }

       //console.log(value)
       
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