const express = require('express');
const router = require('./routes/index.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/api", router)

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))