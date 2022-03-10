// document.getElementById("dialog-box").addEventListener('click',()=>{
   
// });

// const iconclass = document.getElementById("side-navbar-icon");
// iconclass.addEventListener('click',()=>{
//     document.getElementById("sidenavbar-header").classList.add("sidenavbar-header-open");
//     console.log("click");
// });

const tables = document.getElementById("user-table");
tables.rows[1].cells.item(1).innerHTML = "anim";

document.getElementById("dialog-box").addEventListener('click', async () => {
    const isDarkMode = await window.dataApi.readdata()
    console.log(isDarkMode)
    console.log("hello")
  })



