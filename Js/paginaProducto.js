// js navbar

import {listaDeProductos} from "./admin.js"

console.log("Entraste a pagina productos");
console.log(listaDeProductos);
const form = document.querySelector("form");
const input = document.querySelector('input[type="text"]');
const content = document.querySelector("body");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = input.value.trim();
  if (searchTerm.length) {
    const regex = new RegExp(searchTerm, "gi");
    const textNodes = getTextNodes(content);

    textNodes.forEach((node) => {
      const matches = node.nodeValue.match(regex);
      if (matches && matches.length) {
        const fragment = document.createDocumentFragment();
        const parts = node.nodeValue.split(regex);

        parts.forEach((part, index) => {
          const span = document.createElement('span');
          span.textContent = part;
          fragment.appendChild(span);

          if (index < parts.length - 1) {
            const match = document.createElement('span');
            match.textContent = matches[index];
            match.classList.add('highlight');
            fragment.appendChild(match);
          }
        });

        node.parentNode.replaceChild(fragment, node);
      }
    });

    const highlighted = document.querySelector('.highlight');
    if (highlighted) {
      highlighted.scrollIntoView();
    } else {
      alert('No se encontraron coincidencias.');
    }
  }
});

input.addEventListener("input", () => {
  removeHighlights();
});

function getTextNodes(element) {
  const textNodes = [];

  function traverse(element) {
    for (let node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        traverse(node);
      }
    }
  }

  traverse(element);
  return textNodes;
}

function removeHighlights() {
  const highlighted = document.querySelectorAll('.highlight');
  highlighted.forEach((element) => {
    const parent = element.parentNode;
    parent.replaceChild(document.createTextNode(element.textContent), element);
  });
}

// js principal
const bicicletasContainer = document.getElementById('bicicletas-container');
const filtroSelect = document.getElementById('opFil');



const mostrarBicicletas = (listaDeProductos) => {
  bicicletasContainer.innerHTML = '';

  listaDeProductos.forEach(bicicleta => {
    const tarjeta = `
      <div class="cards-hovC col-sm-12 col-md-3 col-lg-3 mb-3 mt-3">
        <div class="card shadow-lg">
          <img src="${bicicleta.imagen}" alt="biciMB">
          <hr>
          <div class="card-body ${bicicleta.categoria}">
            <h6 class="card-title"><b> ${bicicleta.nombre}</b><img src="https://i.postimg.cc/W1wFMSLW/icono-topmega2.png" alt="topmega"></h6>
            <div class="card-text d-flex">
              <h5 class="precioOrig me-3">$${bicicleta.precio}</h5>
            </div>
            <div class="d-flex justify-content-center">
              <a href="../html/carrito.html" class="btn btn-success">AGREGAR AL CARRITO</a>
            </div>
          </div>
        </div>
      </div>
    `;

    bicicletasContainer.insertAdjacentHTML('beforeend', tarjeta);
  });
};

const filtrarBicicletas = () => {
  const categoriaSeleccionada = filtroSelect.value;

  if (categoriaSeleccionada === 'todos') {
    mostrarBicicletas(listaDeProductos);
  } else {
    const bicicletasFiltradas = listaDeProductos.filter(bicicleta => bicicleta.categoria === categoriaSeleccionada);
    mostrarBicicletas(bicicletasFiltradas);
  }
};

filtroSelect.addEventListener('change', filtrarBicicletas);

mostrarBicicletas(listaDeProductos);


//filtro precio js//


 function filtrarPorPrecio() {
  const minimo = parseFloat(document.getElementById("minimo").value);
  const maximo = parseFloat(document.getElementById("maximo").value);


  if (minimo && maximo && !isNaN(minimo) && !isNaN(maximo)) {
  const bicicletasContainer = document.getElementById("bicicletas-container");
  const bicicletasFiltradasPrecios=[]
  listaDeProductos.forEach((bicicleta)=>{
    const precio=bicicleta.precio
    if(precio >= minimo && precio <= maximo ){
      bicicletasFiltradasPrecios.push(bicicleta)      
    } else {}
  }
 )
 mostrarBicicletas(bicicletasFiltradasPrecios);
}else{
  alert("Por favor, completa tanto el mínimo como el máximo con valores numéricos.")
 }
  
 }


// Agregar un evento click al botón de búsqueda
const botonFil = document.querySelector(".botonFil");
botonFil.addEventListener("click", filtrarPorPrecio);


