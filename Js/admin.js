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

console.log("HOLA")

//Función para agregar productos

agregarButton.addEventListener("click", () => {
    //Obtenemos los valores del formulario
    const id = uuidv4();
    const nombre = nombreInput.value;
    const categoria = categoriaInput.value;
    const descripcion = descripcionInput.value;
    const precio = precioInput.value;
    const imagen = imagenInput.value;
    const mode = agregarProductosForm.dataset.mode;
    const editId = agregarProductosForm.dataset.editId;


    //Agregamos los datos a la lista
    listaDeProductos.push({nombre,categoria, descripcion, precio, imagen});

    agregarProductosForm.reset();

    actualizarTabla();
})


//Función para editar productos

    listaDeProductos.addEventListener("click", (e) => {
        if(e.target.classList.contains("editar")) {
            const idCapturado = e.target.dataset.id;
            const producto = producto.find((producto) => (producto.id === idCapturado))
            if (producto) {
                document.getElementById("nombre").value = producto.nombre;
                document.getElementById("categoria").value = producto.categoria;
                document.getElementById("descripcion").value = producto.descripcion;
                document.getElementById("precio").value = producto.precio;
                document.getElementById("imagen").value = producto.imagen;

                //Setear el form para que este en modo editar
                agregarProductosForm.dataset.mode = "editar";
                //Almacenar el id del producto que se esta editando
                agregarProductosForm.dataset.editId = id;
                //Cambiar el texto del botón
                agregarButton.textContent("Editar");
                
            }
        }

    })



//Función para eliminar productos
 
 listaProductos.addEventListener("click", (e) => {
    console.log("Ingresamos a la función");
     if(e.target.classList.contains("eliminar")) {
        if(confirm("Estas seguro que deseas eliminar el producto?")){
        console.log("El elemento contiene la class eliminar");
        const idCapturado = e.target.dataset.id;
        console.log(idCapturado);
        const index = listaDeProductos.findIndex((producto) => producto.id === idCapturado);
        if (index !== -1){
            listaDeProductos.splice(index, 1);
            actualizarTabla();
        }
     }
     else{
        console.log("No se eliminó");
     }
    }

 })




//Función para mostrar datos en la tabla

function actualizarTabla(){
    tableBody.innerHTML = "";

    listaDeProductos.forEach((item, index) => {
        const fila = document.createElement("tr");
        const idCelda = document.createElement("td");
        const nombreCelda = document.createElement("td");
        const categoriaCelda = document.createElement("td");
        const descripcionCelda = document.createElement("td");
        const precioCelda = document.createElement("td");
        const imagenCelda = document.createElement("td");
        const editarButton = document.createElement("button");
        const eliminarButton = document.createElement("button");

        //Agregamos una clase a los botones
        editarButton.setAttribute("class", "btn btn-primary editar");
        editarButton.setAttribute("data-id", item.id);
        eliminarButton.setAttribute("class", "btn btn-primary eliminar");
        eliminarButton.setAttribute("data-id", item.id);

        idCelda.textContent = item.id;
        nombreCelda.textContent = item.nombre;
        categoriaCelda.textContent = item.categoria;
        descripcionCelda.textContent = item.descripcion;
        precioCelda.textContent = item.precio;
        imagenCelda.textContent = item.imagen;
        editarButton.textContent = "Editar";
        eliminarButton.textContent = "Eliminar";

        fila.appendChild(idCelda);
        fila.appendChild(nombreCelda);
        fila.appendChild(categoriaCelda);
        fila.appendChild(descripcionCelda);
        fila.appendChild(precioCelda);
        fila.appendChild(imagenCelda);
        fila.appendChild(editarButton);
        fila.appendChild(eliminarButton);

        tableBody.appendChild(fila);        
      

    })

}

 //Función para generar un id unico
 function uuidv4() {
    return crypto.randomUUID();
}