const nombreInput = document.getElementById("nombre");
const descripcionInput = document.getElementById("descripcion");
const precioInput = document.getElementById("precio");
const imagenInput = document.getElementById("imagen");
const agregarButton = document.getElementById("agregar");
const tableBody = document.getElementById("table-body")

let listaDeProductos = [];

agregarButton.addEventListener("click", () => {
    //Obtenemos los valores del formulario
    const nombre = nombreInput.value;
    const descripcion = descripcionInput.value;
    const precio = precioInput.value;
    const imagen = imagenInput.value;

    //Agregamos los datos a la lista
    listaDeProductos.push({nombre, descripcion, precio, imagen});

    actualizarTabla();
})

function actualizarTabla(){
    
    //tableBody.innerHTML = "";

    listaDeProductos.forEach((item, index) => {
        const fila = document.createElement("tr");
        const nombreCelda = document.createElement("td");
        const descripcionCelda = document.createElement("td");
        const precioCelda = document.createElement("td");
        const imagenCelda = document.createElement("td");
        const editarButton = document.createElement("button");
        const eliminarButton = document.createElement("button");

        nombreCelda.textContent = item.nombre;
        descripcionCelda.textContent = item.descripcion;
        precioCelda.textContent = item.precio;
        imagenCelda.textContent = item.imagen;
        editarButton.textContent = "Editar";
        eliminarButton.textContent = "Eliminar";

        fila.appendChild(nombreCelda);
        fila.appendChild(descripcionCelda);
        fila.appendChild(precioCelda);
        fila.appendChild(imagenCelda);
        fila.appendChild(editarButton);
        fila.appendChild(eliminarButton);

        tableBody.appendChild(fila);
        

        //Agregamos eventos a los botones editar y eliminar
        editarButton.addEventListener("click", () => {
            nombreInput.value = item.nombre;
            descripcionInput.value = item.descripcion;
            precioInput.value = item.precio;
            agregarButton.style.display = "none";
            updateButton.style.display = "inline-block";

            //Guarda el índice del item
            indexActual = index;
        } );

        eliminarButton.addEventListener("click", () => {
            //Elimina el item de la lista

            listaDeProductos.splice(index,1);

            actualizarTabla;
        });
    })
}

