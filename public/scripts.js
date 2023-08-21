const socket = io();

document.getElementById("agregar-producto-form").addEventListener("submit", (e) => {
    e.preventDefault()

    const nombreInput = document.getElementById("nombre")
    const precioInput = document.getElementById("precio")
    const cantidadInput = document.getElementById("cantidad")

    const nombre = nombreInput.value
    const precio = precioInput.value
    const cantidad = cantidadInput.value

    socket.emit("agregarProducto", { nombre, precio, cantidad })

    
    nombreInput.value = ""
    precioInput.value = ""
    cantidadInput.value = ""
});

socket.on("productos", (productos) => {
    const productosList = document.getElementById("productos-list")
    productosList.innerHTML = ""

    productos.forEach(producto => {
        const productoElement = document.createElement("div")
        productoElement.innerHTML = `<strong>Producto:</strong> Nombre: ${producto.nombre}, Precio: ${producto.precio}, Cantidad: ${producto.cantidad}`
        productosList.appendChild(productoElement)
    })
})

document.getElementById("eliminar-ultimo").addEventListener("click", () => {
    socket.emit("eliminarUltimoProducto");
})

