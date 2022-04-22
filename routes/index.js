const Router = require("express");
const {getProducts, getProductId, createProduct, updateById, deleteProduct, allProducts, createCarrito, deleteCarrito,
getCarrito, addProduct, deleteProductCarrito} = require("../controllers/main.js");

const router = Router();

const date = () =>{ return new Date().toDateString()}

//                         ADMINISTRADOR

const administrador = true

//                       RUTA:/API/PRODUCTOS


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
})

router.post("/productos" ,(req, res) =>{
    if (administrador == true) {
        let respuesta =  createProduct(req.body)
        res.json(respuesta)
        
    } else {
        const mensaje = {"error": -2, "descripcion": "ruta /api/productos/ método 'GET' no implementada"}
        res.send(mensaje)
    }
})

router.put("/productos/:id" ,(req, res) =>{

    if (administrador == true) {
        
        let id = (req.params.id)
        let nuevoProducto = {
        "id": id,
        "timestamp": date(),
        "nombre": "Cartuchera",
        "descripcion": "Faber-Castell",
        "codigo": "cod120",
        "precio": 450,
        "stock": 6,
        "foto": "www.cartuchera.com.jpg"}

            if (administrador == true) {
                let respuesta = updateById(id, nuevoProducto)
                res.send(respuesta)
                
            } else {
                return console.log( `error : -1, descripcion: ruta '/productos/:id' método 'PUT' no autorizada`)
            }

        
    } else { 
        console.log( `error : -1, descripcion: ruta '/productos/:id' método 'PUT' no autorizada`)
    }
    
})

router.delete("/productos/:id" ,(req, res) =>{

    if (administrador == true) {
        
        res.send(deleteProduct(req.params.id))
    } else {
        console.log( `error : -1, descripcion: ruta '/productos/:id' método 'DELETE' no autorizada`)
    }
})


//                       RUTA:/API/CARRITO

router.post("/carrito" ,(req, res) =>{
    let respuesta =  createCarrito(req.body)
    res.send(respuesta)
})

router.delete("/carrito/:id" ,(req, res) =>{
    let respuesta =  deleteCarrito((req.params.id))
    res.json(respuesta)
})

router.get("/carrito/:id/productos" ,(req, res) =>{
    let respuesta =  getCarrito()
    res.json(respuesta)
})

router.post("/carrito/:id/productos" ,(req, res) =>{
    let respuesta =  addProduct(req.body)
    res.json(respuesta)
})

// INCONCLUSO

/* router.delete("/carrito/:id/productos/:id_prod" ,(req, res) =>{
    let respuesta =  deleteProductCarrito(req.params.id)
    res.json(respuesta)
}) */

module.exports = router;