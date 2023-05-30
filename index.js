
let isAdmin = JSON.parse(localStorage.getItem("variable"));

const admin = document.getElementById("admin");

const panelAdmin = document.getElementById("panelAdmin");

const cerrarSesion = document.getElementById("cerrarSesion");


console.log("FUNCIONA EL INDEX");

console.log(isAdmin);

if(isAdmin){
    admin.style.display = "block";
    panelAdmin.style.display = "block";
    cerrarSesion.style.display = "block"
}else{
    admin.style.display = "none";
    panelAdmin.style.display = "none";
    cerrarSesion.style.display = "none";
}


//cerrarSesion.addEventListener("click", cerrar);



cerrarSesion.addEventListener('click', function() {
  Swal.fire({
    title: '¿Cerrar sesión?',
    text: '¿Estás seguro de que deseas cerrar sesión?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#198754'
  }).then((result) => {
    if (result.isConfirmed) {
        isAdmin = false;
        localStorage.setItem("variable", JSON.stringify(isAdmin));
        window.location.href = './index.html';
    }
  });
});


