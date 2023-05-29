

export let listaDeProductos = [
    {    
        id: '1',
        nombre: 'Bicicleta Top-Mega Yellow M-Bike 29',
        categoria: 'Mountain Bike',
        precio: '140000',
        imagen: 'https://i.postimg.cc/fbzjmbVw/bic-sunshine-negroamarillo.webp',
        isFavorite: true,
    },
    {
        id: '2',
        nombre: 'Bicicleta Top-Mega RUTA R-2933 Aaaa',
        categoria: 'Ruta',
        precio: '260000',
        imagen: 'https://i.postimg.cc/Wb2FB9sn/biciBR1.webp',
        isFavorite: false,

    },
    {
        id: '3',
        nombre: 'Bicicleta Top-Tega Nena c/rueditas',
        categoria: 'Niños',
        precio: '36000',
        imagen: 'https://i.postimg.cc/QthhFy4Y/biciN-2.webp',
        isFavorite: true,

    },
    {
        id: '4',
        nombre: 'Bicicleta Top-Tega Free-Style unisex',
        categoria: 'Niños',
        precio: '49000',
        imagen: 'https://i.postimg.cc/W4MsbvnJ/biciN-1.webp',
        isFavorite: false,
    },    
  ];
  
 listaDeProductos = JSON.parse(localStorage.getItem("productos"));

//const idInput = document.getElementById("id");
const nombreInput = document.getElementById("nombre");
const categoriaInput = document.getElementById("categoria")
const precioInput = document.getElementById("precio");
const imagenInput = document.getElementById("imagen");
const agregarButton = document.getElementById("agregar");
const tableBody = document.getElementById("table-body")
const agregarProductosForm = document.getElementById("agregarProductosForm");
const listaProductos = document.getElementById("lista-productos");



actualizarTabla();


if(agregarButton){
agregarButton.addEventListener("click", agregarProducto);
}

if(listaProductos){
listaProductos.addEventListener("click", editarProducto);
}

if(listaProductos){
listaProductos.addEventListener("click", eliminarProducto);
}

console.log(listaDeProductos);



//Función para validar el formulario

    function validarForm () {

        if (nombreInput.value == ""){
            alert("Debe ingresar el nombre del producto");
            return false;
        }

        if(categoriaInput.value == ""){
            alert("Debe ingresar la categoría del producto");
            return false;
        }

        if(precioInput.value == ""){
            alert("Debe ingresar un precio del producto");
            return false;
        }

        return true;
    }

// //Función para agregar productos

function agregarProducto(e) {
    e.preventDefault();

    if(validarForm() == true){

    //Obtenemos los valores del formulario
    const nombre = nombreInput.value;
    const categoria = categoriaInput.value;
    const precio = precioInput.value;
    const imagen = imagenInput.value;
    const mode = agregarProductosForm.dataset.mode;
    const editId = agregarProductosForm.dataset.editId;



    if(mode === "add"){
        const id = uuidv4();
        const producto = {id, nombre, categoria, precio, imagen};
        listaDeProductos.push(producto);
    } else if (mode ==="edit"){
        agregarButton.setAttribute("class", "btn btn-primary")
        const index = listaDeProductos.findIndex((producto) => producto.id === editId);
        if(index !== -1) {
            const producto = listaDeProductos[index];
            producto.nombre = nombre;
            producto.categoria = categoria;
            producto.precio = precio;
            producto.imagen = imagen;
        }
    }



    agregarProductosForm.reset();
    agregarProductosForm.dataset.mode = "add";
    agregarButton.textContent = "Agregar"
    console.log(listaDeProductos)
    actualizarTabla();
}
}

// //Función para editar productos
function editarProducto(e){
    if(e.target.classList.contains("editar")) {
        const idCapturado = e.target.dataset.id;
        const producto = listaDeProductos.find((producto) => (producto.id === idCapturado))
        if (producto) {

            nombreInput.value = producto.nombre;
            categoriaInput.value = producto.categoria;
            precioInput.value = producto.precio;
            imagenInput.value = producto.imagen;

            actualizarTabla();

            agregarProductosForm.dataset.mode = "edit";
            
            agregarProductosForm.dataset.editId = idCapturado;

            agregarButton.textContent = "Editar";

            agregarButton.setAttribute("class", "btn btn-warning")

            
        }
    }
}


// //Función para eliminar productos

function eliminarProducto(e) {
     if(e.target.classList.contains("eliminar")) {
        Swal.fire({
            title: 'Estas seguro que deseas eliminar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
          }).then((result) => {
            if (result.isConfirmed) {
                const idCapturado = e.target.dataset.id;
        console.log(idCapturado);
        const index = listaDeProductos.findIndex((producto) => producto.id === idCapturado);
        if (index !== -1){
            listaDeProductos.splice(index, 1);
            actualizarTabla();
        }
              Swal.fire(
                'El producto fue correctamente eliminado',
              )
            }
          })
}
}
  

// //Función para mostrar datos en la tabla

function actualizarTabla(){
    if(tableBody){
    tableBody.innerHTML = "";
    }


    localStorage.setItem("productos", JSON.stringify(listaDeProductos));
    console.log(listaDeProductos);


    listaDeProductos.forEach((item) => {

        //Creamos los elementos de la tabla
        const fila = document.createElement("tr");

        const nombreCelda = document.createElement("td");
        nombreCelda.textContent = item.nombre;

        const categoriaCelda = document.createElement("td");
        categoriaCelda.textContent = item.categoria;

        const precioCelda = document.createElement("td");
        precioCelda.textContent = item.precio;

        const imagenCelda = document.createElement("td");
        const imagenProducto = document.createElement("img");
        imagenProducto.src = item.imagen;
        imagenProducto.alt = "Imagen del producto"
        imagenProducto.classList.add("producto-imagen");
        imagenCelda.appendChild(imagenProducto);

        const editarButton = document.createElement("button");
        editarButton.setAttribute("class", "btn btn-primary editar");
        editarButton.setAttribute("data-id", item.id);
        editarButton.textContent = "Editar";

        const eliminarButton = document.createElement("button");
        eliminarButton.setAttribute("class", "btn btn-primary eliminar");
        eliminarButton.setAttribute("data-id", item.id);
        eliminarButton.textContent = "Eliminar";
       
       

        fila.appendChild(nombreCelda);
        fila.appendChild(categoriaCelda);
        fila.appendChild(precioCelda);
        fila.appendChild(imagenCelda);
        fila.appendChild(editarButton);
        fila.appendChild(eliminarButton);

        if(tableBody){
        tableBody.appendChild(fila);        
        }

    })

    
}

// const productosLocalStorage = JSON.parse(localStorage.getItem("productos"));

// if(productosLocalStorage){
//     listaDeProductos = productosLocalStorage;
//     actualizarTabla();
// }


 //Función para generar un id unico
 function uuidv4() {
    return crypto.randomUUID();
 }