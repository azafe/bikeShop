// js navbar
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

const bicicletas = [
  {
    marca: 'Top-mega',
    modelo: 'Bicicleta Top-Mega Yellow M-Bike 29',
    categoria: 'mountain bike',
    precio: '140000',
    src: 'https://i.postimg.cc/fbzjmbVw/bic-sunshine-negroamarillo.webp'
  },
  {
    marca: 'Top-mega',
    modelo: 'Bicicleta Top-Mega BLue M-Bike 29',
    categoria: 'mountain bike',
    precio: '210000',
    src: 'https://i.postimg.cc/pTyfc1Q4/sunshine-celeste-rojo.webp'
  },
  {
    marca: 'Top-mega',
    modelo: 'Bicicleta Top-Mega RUTA  R-29',
    categoria: 'ruta',
    precio: '384000',
    src: 'https://i.postimg.cc/jj1sb06w/biciBR4.jpg'
  },
  {
    marca: 'Top-mega',
    modelo: 'Bicicleta Top-Mega RUTA R-29',
    categoria: 'ruta',
    precio: '260000',
    src: 'https://i.postimg.cc/Wb2FB9sn/biciBR1.webp'
  },
  {
    marca: 'Top-mega',
    modelo: 'Bicicleta Top-Tega Nena c/rueditas',
    categoria: 'ninos',
    precio: '36000',
    src: 'https://i.postimg.cc/QthhFy4Y/biciN-2.webp'
  },
  {
    marca: 'Top-mega',
    modelo: 'Bicicleta Top-Tega Free-Style unisex',
    categoria: 'ninos',
    precio: '49000',
    src: 'https://i.postimg.cc/W4MsbvnJ/biciN-1.webp'
  },

  
];

const mostrarBicicletas = (bicicletas) => {
  bicicletasContainer.innerHTML = '';

  bicicletas.forEach(bicicleta => {
    const tarjeta = `
      <div class="cards-hovC col-sm-12 col-md-3 col-lg-3 mb-3 mt-3">
        <div class="card shadow-lg">
          <img src="${bicicleta.src}" alt="biciMB">
          <hr>
          <div class="card-body ${bicicleta.categoria}">
            <h6 class="card-title"><b>${bicicleta.marca} ${bicicleta.modelo}</b><img src="https://i.postimg.cc/W1wFMSLW/icono-topmega2.png" alt="topmega"></h6>
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
    mostrarBicicletas(bicicletas);
  } else {
    const bicicletasFiltradas = bicicletas.filter(bicicleta => bicicleta.categoria === categoriaSeleccionada);
    mostrarBicicletas(bicicletasFiltradas);
  }
};

filtroSelect.addEventListener('change', filtrarBicicletas);

mostrarBicicletas(bicicletas);


//filtro precio js//


 function filtrarPorPrecio() {
  const minimo = parseFloat(document.getElementById("minimo").value);
  const maximo = parseFloat(document.getElementById("maximo").value);

  const bicicletasContainer = document.getElementById("bicicletas-container");
  const bicicletasFiltradasPrecios=[]
  bicicletas.forEach((bicicleta)=>{
    precio=bicicleta.precio
    if(precio >= minimo && precio <= maximo ){
      bicicletasFiltradasPrecios.push(bicicleta)      
    } else {}
  }
 )
 mostrarBicicletas(bicicletasFiltradasPrecios);
  
 }


// Agregar un evento click al botón de búsqueda
const botonFil = document.querySelector(".botonFil");
botonFil.addEventListener("click", filtrarPorPrecio);


