
const conteiner = document.querySelector(".conteiner");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnPopup = document.querySelector(".btnLogin-popup");
const iconClose = document.querySelector(".icon-close");

const botonDeLogin = document.getElementById("botonDeLogin");


if(registerLink){
registerLink.addEventListener("click", () => {
  conteiner.classList.add("active");
});
}

if(loginLink){
loginLink.addEventListener("click", () => {
  conteiner.classList.remove("active");
});
}

if(btnPopup){
btnPopup.addEventListener("click", () => {
  conteiner.classList.add("active-popup");
});
}

if(iconClose){
iconClose.addEventListener("click", () => {
  conteiner.classList.remove("active-popup");
});
}

// if(botonDeLogin){
// botonDeLogin.addEventListener("click", login);
// }

let isAdmin = false;


botonDeLogin.addEventListener('click', function() {
  event.preventDefault();

  let userName = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let isAdmin = false;

  if (userName === "admin" && password === "admin") {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Inicio sesión correctamente',
      showConfirmButton: false,
      timer: 1500
    }).then((result) => {
      isAdmin = true;
      localStorage.setItem("variable", JSON.stringify(isAdmin));
      window.location.href = "../index.html";
    })
  } else {
   
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Usuario o contraseña incorrectos',
      showConfirmButton: true
    });
    isAdmin = false;
    localStorage.setItem("variable", JSON.stringify(isAdmin));
  }
});

// /*Usuario admin*/
// function login() {
//   let userName = document.getElementById("username").value;
//   let password = document.getElementById("password").value;

//   if (userName === "admin" && password === "admin") {
//     isAdmin = true;
//     Swal.fire({
//       icon: 'success',
//       title: 'Inicio de sesión correcto',
//       text: 'Se ha iniciado sesión correctamente',
//       showConfirmButton: false,
//       timer: 2000
//     }).then((result) => {
//       window.location.href = "../index.html";
//     });
//   } else {
//     isAdmin = true;
//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: 'Usuario o contraseña incorrectos',
//       showConfirmButton: true
//     });
//   }
// }


/*validacion form*/


// const formulario = document.getElementById('formulario')
// const inputs = document.querySelectorAll('#formulario input')


// const expresiones = {
//   nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
//   apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
//   usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
//   password1: /^.{4,12}$/, // 4 a 12 digitos.
//   email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
// };

// const validarFormulario = (e) => {
// 	switch (e.target.name) {
// 		case "nombre":
// 			validarCampo(expresiones.nombre, e.target, 'nombre')
// 		break;
// 		case "apellido":
// 			validarCampo(expresiones.apellido, e.target, 'apellido')
// 		break;
// 		case "usuario":
//       validarCampo(expresiones.usuario, e.target, 'usuario')
// 		break;
// 		case "email":
// 			validarCampo(expresiones.email, e.target, 'email')
// 		break;
// 		case "password1":
//       validarCampo(expresiones.password1, e.target, 'password1')
//       validarPassword2();
// 		break;
// 		case "password2":
// 			validarPassword2();
// 		break;
//   }
// }

// const validarCampo = (expresiones, input, campo) => {
//   if(expresiones.test(input.value)){
//     document.getElementById(`grupo__${campo}`).classList.remove('error')
//     document.getElementById(`grupo__${campo}`).classList.add('success')
//   }else {
//     document.getElementById(`grupo__${campo}`).classList.add('error')
//     document.getElementById(`grupo__${campo}`).classList.remove('success')
//   }
// }

// const validarPassword2 = () => {
//   const inputPassword1 = document.getElementById('password1');
//   const inputPassword2 = document.getElementById('password2');

//   if( inputPassword1.value !== inputPassword2){
//     document.getElementById(`grupo__password2`).classList.add('error')
//     document.getElementById(`grupo__password2`).classList.remove('success')
//   } else {
//     document.getElementById(`grupo__password2`).classList.remove('error')
//     document.getElementById(`grupo__password2`).classList.add('success')
//   }
// }

// inputs.forEach((input) => {
//   input.addEventListener('keyup', validarFormulario);
//   input.addEventListener('blur', validarFormulario);
// });


// if(formulario){
// formulario.addEventListener('submit', (e) => {
//   e.preventDefault();
// })
// }


