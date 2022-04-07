const express = require('express');
//import router from './routes/index.js';
const app = express();

app.set("views", "views");
app.set("view engine", "ejs");


app.use(express.urlencoded({extended: true}))
//app.use(express.json());
//app.use("/api", router)


const productos = [
    {price: 1000, title: "libro", thumbnail: "https://cdn3.iconfinder.com/data/icons/education-and-school-8/48/Book-256.png"},
    {price: 80, title: "lapicera", thumbnail: "https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Sharpie-256.png"},
    {price: 110, title: "regla", thumbnail: "https://cdn3.iconfinder.com/data/icons/education-and-learning-set-2-1/256/47-256.png"},
    {price: 4000, title: "mochila", thumbnail: "https://cdn4.iconfinder.com/data/icons/camping-flat/614/1341_-_Bag-256.png"}
]

app.get("/", (req, res) =>{
    res.render("index")
})
app.get("/productos", (req, res) =>{
    res.render("inicio", {productos: productos})
})

app.post("/productos", (req, res)=>{
    productos.push(req.body)
    res.redirect("/productos")
})

const PORT = 8080 

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))