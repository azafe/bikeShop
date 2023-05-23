
import {listaDeProductos} from "./admin.js"


console.log("Arranca el JS categoría");
console.log(listaDeProductos);

mostrarProductos(listaDeProductos);


function mostrarProductos(productos){
const gridContainer = document.getElementById("grid-container")
gridContainer.innerHTML = '';

productos.forEach((producto) => {
    const colDiv = document.createElement("div");
    colDiv.className = "cards-hovC  col-lg-3  ";

    const cardDiv = document.createElement("div");
    cardDiv.className = "card shadow-lg";

    const imagen = document.createElement("img")
    imagen.src = producto.imagen;
    imagen.className = "card-img-top"

    const cardHover = document.createElement("div")
    cardHover.className = "cards-hovC"

    const cardBody = document.createElement("div");
    cardBody.className = "card-body"

    const nombre = document.createElement("h5");
    nombre.className = "card-title ";
    nombre.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.className = "card-text d-flex precioOrig me-3"
    precio.textContent = producto.precio;

    const button = document.createElement("a");
    button.href = "#";
    button.className = "btn btn-success d-flex justify-content-center";
    button.textContent = "AGREGAR AL CARRITO"

    cardBody.appendChild(nombre);
    cardBody.appendChild (precio);
    cardBody.appendChild(button);

    cardDiv.appendChild(imagen);
    cardDiv.appendChild(cardBody);

    colDiv.appendChild(cardHover);

    cardHover.appendChild(cardDiv);

    gridContainer.appendChild(colDiv);

})
}


function filtrarPorCategoria(categoria) {

    console.log("Ingresamos a filtrar por categoria")
    let productosFiltrados = [];

    if(categoria === "all"){
        productosFiltrados = listaDeProductos;
    } else {
        productosFiltrados = listaDeProductos.filter((producto) => {
            return producto.categoria === categoria;
        });
    }

    mostrarProductos(productosFiltrados);

    const categoryLinks = document.querySelectorAll(".category-link");
    categoryLinks.forEach(function(link) {
        link.classList.remove("active");
        if(link.getAttribute("onclick").includes(categoria)){
            link.classList.add("active")
        }
    })
}

const categoryLinks = document.querySelectorAll('.category-link');
categoryLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    var categoria = this.dataset.category;
    filtrarPorCategoria(categoria);
});
});

