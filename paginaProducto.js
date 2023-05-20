//js navbar//
const form = document.querySelector("form");
const input = document.querySelector('input[type="text"]');
const content = document.querySelector("body");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = input.value.trim();
  if (searchTerm.length) {
    const regex = new RegExp(searchTerm, "gi");
    const matches = content.innerHTML.match(regex);
    if (matches && matches.length) {
        content.innerHTML = content.innerHTML.replace(regex, '<span class="highlight">$&</span>');
        const highlighted = document.querySelector('.highlight');
        highlighted.scrollIntoView();
      } else {
        alert('No se encontraron coincidencias.');
      }
  }
});

//js principal//
const bicicletasContainer = document.getElementById('bicicletas-container');
const filtroSelect = document.getElementById('opFil');

const bicicletas = [
  {
    marca: 'Top-mega',
    modelo: 'Bicicleta Top-Mega Yellow M-Bike 29',
    categoria: 'mountain bike',
    precio: '$140.999',
    src: 'https://i.postimg.cc/fbzjmbVw/bic-sunshine-negroamarillo.webp'
  },
  {
    marca: 'Top-mega',
    modelo: 'Bicicleta Top-Mega BLue M-Bike 29',
    categoria: 'mountain bike',
    precio: '$210.999',
    src: 'https://i.postimg.cc/pTyfc1Q4/sunshine-celeste-rojo.webp'
  },
  {
    marca: 'Top-mega',
    modelo: 'Bicicleta Top-Mega RUTA  R-29',
    categoria: 'ruta',
    precio: '$384.999',
    src: 'https://i.postimg.cc/jj1sb06w/biciBR4.jpg'
  },
  {
    marca: 'Top-mega',
    modelo: 'Bicicleta Top-Mega RUTA R-29',
    categoria: 'ruta',
    precio: '$269.999',
    src: 'https://i.postimg.cc/Wb2FB9sn/biciBR1.webp'
  },
  {
    marca: 'Top-mega',
    modelo: 'Bicicleta Top-Tega Nena c/rueditas',
    categoria: 'ninos',
    precio: '$36.700',
    src: 'https://i.postimg.cc/QthhFy4Y/biciN-2.webp'
  },
  {
    marca: 'Top-mega',
    modelo: 'Bicicleta Top-Tega Free-Style unisex',
    categoria: 'ninos',
    precio: '$49.999',
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
              <h5 class="precioOrig me-3">${bicicleta.precio}</h5>
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

