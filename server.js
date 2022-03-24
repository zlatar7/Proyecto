const express = require('express')
const app = express();
const {obtenerProducto, obtenerProductoRandom} = require("./controllers/main");


app.use(express.static('public'))

app.get('/productos', (req,res) => { 
    let respuesta = obtenerProducto();
    res.send(`<h1>${respuesta}</h1>`);
})
app.get('/productoRandom', (req,res) => {
    let respuesta = obtenerProductoRandom();
    res.send(`<h1>${respuesta}</h1>`)
})

const PORT = 8080 

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))