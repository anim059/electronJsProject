
//creating a initial object//
let userObj = {
  id:"",
  fname : "",
  lname : "",
  email : ""
}


const tables = document.getElementById("user-table");

let data;
// load event is used for getting all user information when the page is loaded //
window.addEventListener('load', async () => {
    const isDarkMode = await window.dataApi.readdata().then((result) => {
      data=result
    })
   
    const user_data = data.split('\n')
   
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
      const field_id = json_data["fname"]+json_data["email"]
      
      cell5.innerHTML = `<button id=${json_data["id"]} onclick="EditFunction(this.id)"  style="background-color:#7fbb7f;color:white;
      border-radius:5px;text-align:center;font-size:20px;">Edit</button>`
      cell6.innerHTML = `<button id=${json_data["id"]} onclick="DeleteFunction(this.id)" style="background-color:#d32a2a;color:white;
      border-radius:5px;text-align:center;font-size:20px;">Delete</button>`

      
    }
      
  })


   // this function is for updating a specifice user from database //
  const EditFunction = async (field_id) => {
    document.getElementById("load-form").classList.remove("form_display")
    document.getElementById("load-form").classList.add("show_form_display")
    let searchValue ;
    const searchData = await window.dataApi.searchdata(field_id).then((result)=>{
      searchValue = result;
    });

     const form_obj = document.getElementById("update_data_form")
     form_obj.elements["fname"].value = searchValue["fname"];
     form_obj.elements["lname"].value = searchValue["lname"];
     form_obj.elements["email"].value = searchValue["email"];


     document.getElementById("update-form-submit").addEventListener('click',()=>{
      document.getElementById("load-form").classList.remove("show_form_display")
      document.getElementById("load-form").classList.add("form_display")

      userObj["fname"] = form_obj.elements["fname"].value;
      userObj["lname"] = form_obj.elements["lname"].value;
      userObj["email"] = form_obj.elements["email"].value;
      userObj["id"] = field_id;

      window.dataApi.Updatedata(userObj);
      
    });
    document.getElementById("form-close-btn").addEventListener('click',()=>{
      document.getElementById("load-form").classList.remove("show_form_display")
      document.getElementById("load-form").classList.add("form_display")
    });
     
    }


    // this function is for deleting a specifice user from database //
    function DeleteFunction(field_id){
      window.dataApi.Deletedata(field_id);
      window.location.href = "../html/child.html"
   }


