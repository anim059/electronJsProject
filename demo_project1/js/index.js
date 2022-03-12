
//creating a initial object//
let userObj = {
    id:"",
    fname : "",
    lname : "",
    email : ""
}

const error_message = document.getElementById("error-message");
const crud_form = document.getElementById("crud-form");
const crud_form_btn = document.getElementById("crud-form-submit-btn");
let value_;


// this function is for fetching all data from the form 

function fetchdata(){
    for(let i=1;i<crud_form.length;i++){
        if(crud_form.elements[i].localName == "input"){
            if(document.getElementById(crud_form[i].id).value != ""){
                
                userObj[crud_form[i].id] = document.getElementById(crud_form[i].id).value;
                document.getElementById(crud_form[i].id).value = "";
                error_message.innerText = "";
               
            }else{
                error_message.innerText = "Please Give All Information"
                break;
            }
        }
    }
    userObj["id"] = userObj["fname"]+userObj["lname"];
}


// after click to submit button this click will  call
crud_form_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    fetchdata()
    window.dataApi.fetchdata(userObj);
    //console.log(window.dataApi.fetchdata(userObj));
});
