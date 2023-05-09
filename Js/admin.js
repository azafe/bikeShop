const idInput = document.getElementById("id");
const nombreInput = document.getElementById("nombre");
const descripcionInput = document.getElementById("descripcion");
const precioInput = document.getElementById("precio");
const imagenInput = document.getElementById("imagen");
const agregarButton = document.getElementById("agregar");
const tableBody = document.getElementById("table-body")

let listaDeProductos = [];

agregarButton.addEventListener("click", () => {
    //Obtenemos los valores del formulario
    const id = idInput.value;
    const nombre = nombreInput.value;
    const descripcion = descripcionInput.value;
    const precio = precioInput.value;
    const imagen = imagenInput.value;

    //Agregamos los datos a la lista
    listaDeProductos.push({id, nombre, descripcion, precio, imagen});

    actualizarTabla();
})

function actualizarTabla(){
    tableBody.innerHTML = "";

    listaDeProductos.forEach((item, index) => {
        const fila = document.createElement("tr");
        const idCelda = document.createElement("td");
        const nombreCelda = document.createElement("td");
        const descripcionCelda = document.createElement("td");
        const precioCelda = document.createElement("td");
        const imagenCelda = document.createElement("td");
        const editarButton = document.createElement("button");
        const eliminarButton = document.createElement("button");

        idCelda.textContent = item.id;
        nombreCelda.textContent = item.nombre;
        descripcionCelda.textContent = item.descripcion;
        precioCelda.textContent = item.precio;
        imagenCelda.textContent = item.imagen;
        editarButton.textContent = "Editar";
        eliminarButton.textContent = "Eliminar";

        fila.appendChild(idCelda);
        fila.appendChild(nombreCelda);
        fila.appendChild(descripcionCelda);
        fila.appendChild(precioCelda);
        fila.appendChild(imagenCelda);
        fila.appendChild(editarButton);
        fila.appendChild(eliminarButton);

        tableBody.appendChild(fila);


        
      
        
    })
}

