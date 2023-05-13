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

agregarButton.addEventListener("click", (e) => {
    e.preventDefault();

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



    //Agregamos los datos a la lista
   // listaDeProductos.push({id, nombre,categoria, descripcion, precio, imagen});

    agregarProductosForm.reset();
    agregarProductosForm.dataset.mode = "add";
    agregarButton.textContent = "Agregar"

    actualizarTabla();
})


//Función para editar productos

    listaProductos.addEventListener("click", (e) => {
        if(e.target.classList.contains("editar")) {
            const idCapturado = e.target.dataset.id;
            const producto = listaDeProductos.find((producto) => (producto.id === idCapturado))
            console.log("Ingresamos a la función editar");
            if (producto) {

                nombreInput.value = producto.nombre;
                categoriaInput.value = producto.categoria;
                descripcionInput.value = producto.descripcion;
                precioInput.value = producto.precio;
                imagenInput.value = producto.imagen;

                // document.getElementById("nombre").value = producto.nombre;
                // document.getElementById("categoria").value = producto.categoria;
                // document.getElementById("descripcion").value = producto.descripcion;
                // document.getElementById("precio").value = producto.precio;
                // document.getElementById("imagen").value = producto.imagen;

                //Setear el form para que este en modo editar
                agregarProductosForm.dataset.mode = "editar";
                //Almacenar el id del producto que se esta editando
                agregarProductosForm.dataset.editId = idCapturado;
                //Cambiar el texto del botón
                agregarButton.textContent = "Editar";

                actualizarTabla();
                
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
        imagenCelda.textContent = item.imagen;

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
}




 //Función para generar un id unico
 function uuidv4() {
    return crypto.randomUUID();
 }