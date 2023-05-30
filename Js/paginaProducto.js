// js navbar

import {listaDeProductos} from "./admin.js"

console.log("Se estra ejecutando el js")

const listaDeFavoritos =[];

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

/* js de cards y crud*/


const bicicletasContainer = document.getElementById('bicicletas-container');
const filtroSelect = document.getElementById('opFil');



const mostrarBicicletas = (listaDeProductos) => {
  bicicletasContainer.innerHTML = '';

  let corazonClass;
  listaDeProductos.forEach(bicicleta => {

    

    corazonClass = bicicleta.isFavorite ? "fas fa-heart corazon-rojo iconCorazon" : "far fa-heart iconCorazon"

    const tarjeta = `
      <div class="cards-hovC col-sm-12 col-md-5 col-lg-3 mb-3 mt-3">
        <div class="card shadow-lg">
          <img src="${bicicleta.imagen}" alt="biciMB">
          <hr>
          <div class="card-body ${bicicleta.categoria}">
            <h6 class="card-title"><b> ${bicicleta.nombre}</b><img src="https://i.postimg.cc/W1wFMSLW/icono-topmega2.png" alt="topmega"></h6>
            <div class="card-text d-flex">
              <div class="d-flex align-items-center">
                <i class="${corazonClass}"  data-producto-id="${bicicleta.id}"></i>
                <h5 class="precioOrig me-3">$${bicicleta.precio}</h5>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <a href="/html/error404.html" class="btn btn-success">AGREGAR AL CARRITO</a>
            </div>
          </div>
        </div>
      </div>
    `;

    bicicletasContainer.insertAdjacentHTML('beforeend', tarjeta);

    const corazon = document.querySelector('.iconCorazon')

    if(corazon){
    corazon.addEventListener("click", favorite);
}

  });
};

//Función Favoritos



function favorite(){
  console.log("Ingresamos a la función de favoritos");
}

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


//filtros js//


function filtrarPorPrecio() {
  const minimoInput = document.getElementById("minimo");
  const maximoInput = document.getElementById("maximo");
  const minimo = parseFloat(minimoInput.value);
  const maximo = parseFloat(maximoInput.value);



  if (isNaN(minimo) || minimo <= 0) {
    minimoInput.classList.add("error");
    return;
  } else {
    minimoInput.classList.remove("error");
  }

  if (isNaN(maximo) || maximo <= 0) {
    maximoInput.classList.add("error");
    return;
  } else {
    maximoInput.classList.remove("error");
  }

  const bicicletasContainer = document.getElementById("bicicletas-container");
  const bicicletasFiltradasPrecios = [];
  listaDeProductos.forEach((bicicleta) => {
    const precio = bicicleta.precio;
    if (precio >= minimo && precio <= maximo) {
      bicicletasFiltradasPrecios.push(bicicleta);
    }
  });

  mostrarBicicletas(bicicletasFiltradasPrecios);


  

  if (bicicletasFiltradasPrecios.length === 0) {
    bicicletasContainer.innerHTML = "LO SENTIMOS, NO HEMOS ENCONTRADO RESULTADOS PARA TU BUSQUEDA.";
  }
}

function limpiarFiltros() {
  const minimoInput = document.getElementById("minimo");
  const maximoInput = document.getElementById("maximo");
  minimoInput.value = "";
  maximoInput.value = "";
  minimoInput.classList.remove("error");
  maximoInput.classList.remove("error");
  mostrarBicicletas(listaDeProductos); 
}

const minimoInput = document.getElementById("minimo");
const maximoInput = document.getElementById("maximo");

minimoInput.addEventListener("input", function () {
  if (parseFloat(this.value) < 0) {
    this.value = "";
  }
});

maximoInput.addEventListener("input", function () {
  if (parseFloat(this.value) < 0) {
    this.value = "";
  }
});

const botonFil = document.querySelector(".botonFil");
botonFil.addEventListener("click", filtrarPorPrecio);

const botonLimpiar = document.querySelector(".botonLimpiar");
botonLimpiar.addEventListener("click", limpiarFiltros)







// function favorite(productoId){
//   console.log("Ingresamos a la función de favoritos");
//   const listaDeFavoritos = [];

//   const producto = listaDeProductos.find(producto => producto.id === productoId);

//   if(producto){
//     const index = listaDeFavoritos.indexOf(producto);
//     if (index !== -1){
//       listaDeFavoritos.splice(index,1);
//     }
//   }else{
//     listaDeFavoritos.push(producto);
//   }
  

//   const corazon = $(`i[data-producto-id="${productoId}"]`);
//   corazon.toggleClass('far fas');
// }
