// document.getElementById("dialog-box").addEventListener('click',()=>{
   
// });

// const iconclass = document.getElementById("side-navbar-icon");
// iconclass.addEventListener('click',()=>{
//     document.getElementById("sidenavbar-header").classList.add("sidenavbar-header-open");
//     console.log("click");
// });


document.getElementById("form-open").addEventListener('click',()=>{
   document.getElementById("load-form").classList.remove("form_display")
   document.getElementById("load-form").classList.add("show_form_display")
});

document.getElementById("update-form-submit").addEventListener('click',()=>{
  document.getElementById("load-form").classList.remove("show_form_display")
  document.getElementById("load-form").classList.add("form_display")
});

const tables = document.getElementById("user-table");

let data;
window.addEventListener('load', async () => {
    const isDarkMode = await window.dataApi.readdata().then((result) => {
      data=result
    })
    //console.log(data.length)
    const user_data = data.split('\n')
    //console.log(user_data)

    

    for(var i=0;i<user_data.length;i++){
      const json_data = JSON.parse(user_data[i])
     
      var row = tables.insertRow(i+1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      cell1.innerHTML = i+1;
      cell2.innerHTML = json_data["fname"];
      cell3.innerHTML = json_data["lname"];
      cell4.innerHTML = json_data["email"];
      const field_id = "row"+i+1
      
      cell5.innerHTML = `<button  onclick=${EditFunction()}  style="background-color:#7fbb7f;color:white;
      border-radius:5px;text-align:center;font-size:20px;">Edit</button>`
      cell6.innerHTML = `<button onclick=${DeleteFunction()} style="background-color:#d32a2a;color:white;
      border-radius:5px;text-align:center;font-size:20px;">Delete</button>`
    }
      
  })

  function EditFunction(){
      console.log("hello1")
    }
    function DeleteFunction(){
      console.log("hello2")
   }


