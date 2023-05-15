export  {listaDeProductos}


const idInput = document.getElementById("id");
const nombreInput = document.getElementById("nombre");
const categoriaInput = document.getElementById("categoria")
const descripcionInput = document.getElementById("descripcion");
const precioInput = document.getElementById("precio");
const imagenInput = document.getElementById("imagen");
const agregarButton = document.getElementById("agregar");
const tableBody = document.getElementById("table-body")
const agregarProductosForm = document.getElementById("agregarProductosForm");
const listaProductos = document.getElementById("lista-productos");

let listaDeProductos = [];

agregarButton.addEventListener("click", agregarProducto);

listaProductos.addEventListener("click", editarProducto);

listaProductos.addEventListener("click", eliminarProducto);




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

//Función para agregar productos

function agregarProducto(e) {
    e.preventDefault();

    if(validarForm() == true){

    //Obtenemos los valores del formulario
    const nombre = nombreInput.value;
    const categoria = categoriaInput.value;
    const descripcion = descripcionInput.value;
    const precio = precioInput.value;
    const imagen = imagenInput.value;
    const mode = agregarProductosForm.dataset.mode;
    const editId = agregarProductosForm.dataset.editId;



    if(mode === "add"){
        const id = uuidv4();
        const producto = {id, nombre, categoria, descripcion, precio, imagen};
        listaDeProductos.push(producto);
    } else if (mode ==="edit"){
        agregarButton.setAttribute("class", "btn btn-primary")
        const index = listaDeProductos.findIndex((producto) => producto.id === editId);
        if(index !== -1) {
            const producto = listaDeProductos[index];
            producto.nombre = nombre;
            producto.categoria = categoria;
            producto.descripcion = descripcion;
            producto.precio = precio;
            producto.imagen = imagen;
        }
    }



    agregarProductosForm.reset();
    agregarProductosForm.dataset.mode = "add";
    agregarButton.textContent = "Agregar"

    actualizarTabla();
}
}

//Función para editar productos
function editarProducto(e){
    if(e.target.classList.contains("editar")) {
        const idCapturado = e.target.dataset.id;
        const producto = listaDeProductos.find((producto) => (producto.id === idCapturado))
        if (producto) {

            nombreInput.value = producto.nombre;
            categoriaInput.value = producto.categoria;
            descripcionInput.value = producto.descripcion;
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


//Función para eliminar productos

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
  

//Función para mostrar datos en la tabla

function actualizarTabla(){
    tableBody.innerHTML = "";

    listaDeProductos.forEach((item, index) => {

        //Creamos los elementos de la tabla
        const fila = document.createElement("tr");

        const nombreCelda = document.createElement("td");
        nombreCelda.textContent = item.nombre;

        const categoriaCelda = document.createElement("td");
        categoriaCelda.textContent = item.categoria;

        const descripcionCelda = document.createElement("td");
        descripcionCelda.textContent = item.descripcion;

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
        fila.appendChild(descripcionCelda);
        fila.appendChild(precioCelda);
        fila.appendChild(imagenCelda);
        fila.appendChild(editarButton);
        fila.appendChild(eliminarButton);

        tableBody.appendChild(fila);        
      

    })

    localStorage.setItem("productos", JSON.stringify(listaDeProductos));
}

const prodcutosLocalStorage = JSON.parse(localStorage.getItem("productos"));

if(prodcutosLocalStorage){
    listaDeProductos = prodcutosLocalStorage;
    actualizarTabla();
}


 //Función para generar un id unico
 function uuidv4() {
    return crypto.randomUUID();
 }