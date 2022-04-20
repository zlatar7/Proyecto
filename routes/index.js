const Router = require("express");
const {getProducts, getProductId, updateProduct, updateId, deleteProduct} = require("../controllers/main.js");

const router = Router();

//                       RUTA:/API/PRODUCTOS

router.get("/productos", (req, res) =>{
    res.render("inicio", {productos: productos})
})

router.post("/productos" ,(req, res) =>{
    let respuesta =  updateProduct(req.body)
    res.json(respuesta)
})

router.put("/productos/:id" ,(req, res) =>{
    let respuesta = updateId(req.params.id)
    res.send(respuesta)
})

router.delete("/productos/:id" ,(req, res) =>{
    res.send(deleteProduct(req.params.id))
})

//                       RUTA:/API/CARRITO

router.post("/carrito" ,(req, res) =>{
    let respuesta =  updateProduct(req.body)
    res.json(respuesta)
})

router.delete("/carrito/:id" ,(req, res) =>{
    let respuesta =  updateProduct(req.body)
    res.json(respuesta)
})

router.get("/carrito/:id/productos" ,(req, res) =>{
    let respuesta =  updateProduct(req.body)
    res.json(respuesta)
})

router.post("/carrito/:id/productos" ,(req, res) =>{
    let respuesta =  updateProduct(req.body)
    res.json(respuesta)
})

router.delete("/carrito/:id/productos/:id_prod" ,(req, res) =>{
    let respuesta =  updateProduct(req.body)
    res.json(respuesta)
})

module.exports = router;