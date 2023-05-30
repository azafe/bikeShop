const conteiner = document.querySelector('.conteiner');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnLogin = document.querySelector('loginnav');

registerLink.addEventListener('click', ()=> {
    conteiner.classList.add('active')
});

loginLink.addEventListener('click', ()=> {
    conteiner.classList.remove('active')
});

btnLogin.addEventListener('click', ()=> {
    conteiner.classList.remove('active-poup')
});

function login(){
    let userName = document.getElementById("username").value;
    let password = document.getElementById("password").value;
   

    if( userName === "admin" && password === "admin"){
    window.location.href = "/bikeShop/html/admin.html";
    return false;
    } else{
        alert("Usuario inexistente");
        return false;
    }
}