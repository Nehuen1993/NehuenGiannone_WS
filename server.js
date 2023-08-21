const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("index.hbs");
})

let productos = []  


    io.on("connection", (socket) => {
    console.log("Usuario conectado")

  
    socket.on("agregarProducto", (productoData) => {
    productos.push(productoData);
    io.emit("productos", productos)
    
})

socket.on("eliminarUltimoProducto", () => {
    if (productos.length > 0) {
        productos.pop()
        io.emit("productos", productos)
    }
});

    socket.on("disconnect", () => {
        io.emit("userDisconnected")
        console.log ("Usuario desconectad")
    })
})

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})