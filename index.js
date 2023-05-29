
let isAdmin = JSON.parse(localStorage.getItem("variable"));

const admin = document.getElementById("admin");



console.log("FUNCIONA EL INDEX");

console.log(isAdmin);

if(isAdmin){
    admin.style.display = "block";
}else{
    admin.style.display = "none";
}
