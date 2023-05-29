import { isAdmin } from "./Js/login.js";


const admin = document.getElementById("admin");


console.log("FUNCIONA EL INDEX")

if(isAdmin){
    admin.style.display = 'block'
}else{
    admin.style.display = 'none'
}
