const Router = require("express");
const router = Router();

const {getProducts, getProductId, createProduct, updateById, deleteProduct, allProducts, createCarrito, deleteCarrito,
getCarrito, addProduct, deleteProductCarrito} = require("../controllers/main.js");

const date = () =>{ return new Date().toDateString()}

//            -------------------------ADMINISTRADOR------------------------------

const administrador = true

//            ---------------------RUTA:/API/PRODUCTOS----------------------------


//                                       MÉTODO GET

router.get("/productos/:id?", (req, res) =>{
    let id = (req.params.id)

    if(id == null){
        let respuesta = getProducts();
        res.send(respuesta)
    }
    else if (id > 0 && id < allProducts){
        let response = getProductId(id)
        res.send(response)
    }
    else if(isNaN(id) || id > allProducts){
        res.send( "Error: Descripcion: ruta 'api/productos' método 'GET' no autorizada")
    }
})

//                                      MÉTODO POST

router.post("/productos" ,(req, res) =>{
    if (administrador == true) {
        let respuesta =  createProduct(req.body)
        res.send(respuesta)
        
    } else {
        res.send("Error: descripcion: ruta /api/productos/ método 'GET' no autorizada")
    }
})

//                                      MÉTODO PUT

router.put("/productos/:id" ,(req, res) =>{

    if (administrador == true) {
        let nuevoProducto = (req.body)

        let respuesta = updateById(nuevoProducto)
        res.send(respuesta)

        
    } else { 
        res.send(`Error: Descripcion: ruta '/productos/:id' método 'PUT' no autorizada`)
    }
})

//                                      MÉTODO DELETE

router.delete("/productos/:id" ,(req, res) =>{

    if (administrador == true) {
        
        let respuesta = deleteProduct(req.params.id)
        res.send(respuesta)
    } else {
        res.send( `Error: Descripcion: ruta '/productos/:id' método 'DELETE' no autorizada`)
    }
})

//         -------------------------RUTA:/API/CARRITO-----------------------------


//                                     MÉTODOS POST

router.post("/carrito" ,(req, res) =>{
    let respuesta =  createCarrito(req.body)
    res.send(respuesta)
})

router.post("/carrito/:id/productos" ,(req, res) =>{
    let respuesta = addProduct(req.body, req.params.id)
    res.send(respuesta)
    /* PRODUCTO ENVIADO POR POSTMAN = {
                                        "nombre": "Lapicera",
                                        "descripcion": "Bic",
                                        "codigo": "cod50",
                                        "precio": 40,
                                        "stock": 38,
                                        "foto": "www.lapiceraBic.com.jpg"} */
})

//                                     MÉTODOS DELETE

router.delete("/carrito/:id" ,(req, res) =>{
    let respuesta =  deleteCarrito((req.params.id))
    res.send(respuesta)
})

router.delete("/carrito/:id/productos/:id_prod" ,(req, res) =>{

    let respuesta = deleteProductCarrito(req.params.id, req.params.id_prod)
    res.send(respuesta)
})

//                                      MÉTODO GET

router.get("/carrito/:id/productos" ,(req, res) =>{
    let respuesta =  getCarrito(req.params.id)
    res.send(respuesta)
})

module.exports = router;