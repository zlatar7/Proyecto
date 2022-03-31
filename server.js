import express from 'express';
import router from './routes/index.js';
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use("/api", router)
app.use(express.static('views'))

const PORT = 8080 

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))