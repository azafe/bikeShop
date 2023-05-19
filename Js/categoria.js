
import {listaDeProductos} from "./admin.js"




const gridContainer = document.getElementById("grid-container")

listaDeProductos.forEach((producto) => {
    const colDiv = document.createElement("div");
    colDiv.className = "col-lg-4 col-md-6 mb-3";

    const cardDiv = document.createElement("div");
    cardDiv.className = "card shadow-lg";

    const imagen = document.createElement("img")
    imagen.src = producto.imagen;
    imagen.className = "card-img-top"

    const cardHover = document.createElement("div")
    cardHover.className = "cards-hovC"

    const cardBody = document.createElement("div");
    cardBody.className = "card-body "

    const nombre = document.createElement("h5");
    nombre.className = "card-title";
    nombre.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.className = "card-text d-flex";
    precio.textContent = producto.precio;

    const button = document.createElement("a");
    button.href = "#";
    button.className = "btn btn-success";
    button.textContent = "Agregar al carrito"

    cardBody.appendChild(nombre);
    cardBody.appendChild(precio);
    cardBody.appendChild(button);

    cardDiv.appendChild(imagen);
    cardDiv.appendChild(cardBody);

    colDiv.appendChild(cardHover);

    cardHover.appendChild(cardDiv);

    gridContainer.appendChild(colDiv);

})