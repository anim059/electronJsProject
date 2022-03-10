const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})

contextBridge.exposeInMainWorld('dataApi', {
  fetchdata : (data) => ipcRenderer.send("fetch-user-data",data),
  readdata : () => ipcRenderer.invoke("read-user-data")
})

// ipcRenderer.on('FILES_LIST_FETCHED', (event, result) => {
//   console.log(result);
//   //document.getElementById('divCaminho').innerText = result[0]
// });