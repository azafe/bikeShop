
let isAdmin = JSON.parse(localStorage.getItem("variable"));

const admin = document.getElementById("admin");

const panelAdmin = document.getElementById("panelAdmin");




console.log("FUNCIONA EL INDEX");

console.log(isAdmin);

if(isAdmin){
    admin.style.display = "block";
    panelAdmin.style.display = "block";
}else{
    admin.style.display = "none";
    panelAdmin.style.display = "none";
}
