const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})

contextBridge.exposeInMainWorld('dataApi', {
  fetchdata : (data) => ipcRenderer.send("create-user-data",data),
  readdata : () => ipcRenderer.invoke("read-user-data"),
  searchdata : (id) => ipcRenderer.invoke("search-user-data",id),
  Updatedata : (userData) => ipcRenderer.send("update-user-data",userData),
  Deletedata : (id) => ipcRenderer.send("delete-user-data",id)
})

// ipcRenderer.on('FILES_LIST_FETCHED', (event, result) => {
//   console.log(result);
//   //document.getElementById('divCaminho').innerText = result[0]
// });