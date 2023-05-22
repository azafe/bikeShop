function login(){
    let userName = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    console.log(userName);
    console.log(password);

    if( userName === "admin" && password === "admin"){
    window.location.href = "./html/admin.html";
    return false;
    } else{
        alert("Usuario inexistente");
        return false;
    }
}
