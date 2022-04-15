const express = require('express');
//const router = require('./routes/index.js');
const app = express();
const handlebars = require('express-handlebars');
const res = require('express/lib/response');
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.engine('hbs', handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views",
    layoutsPartial: __dirname + "/views/partials"})
    )
    
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(express.static('public'))
//app.use("/", router)
const messages = []
const productos = [
    {price: 1000, title: "libro", thumbnail: "https://cdn3.iconfinder.com/data/icons/education-and-school-8/48/Book-256.png"},
    {price: 80, title: "lapicera", thumbnail: "https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Sharpie-256.png"},
    {price: 110, title: "regla", thumbnail: "https://cdn3.iconfinder.com/data/icons/education-and-learning-set-2-1/256/47-256.png"},
    {price: 4000, title: "mochila", thumbnail: "https://cdn4.iconfinder.com/data/icons/camping-flat/614/1341_-_Bag-256.png"}
]

app.get("/", (req, res) =>{
    res.render("index", {productos: productos})
})


io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);
    socket.emit('productos', productos)

    socket.on('new-message', function(data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });    
    socket.on('msj', function(data) {
        productos.push(data);
        io.sockets.emit('productos', productos);
        /* res.send("index", {productos: productos}) */
    });    
});
const PORT = process.env.PORT || 8080;
const srv = server.listen(PORT, () => { 
    console.log(`Servidor Http con Websockets escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))