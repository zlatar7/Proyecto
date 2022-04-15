const Router = require("express");
const {getProducts, getProductId, updateProduct, updateId, deleteProduct, productos} = require("../controllers/main.js");

const router = Router();

/* router.get("/", (req, res) =>{
    res.render("index")
}) */
router.get("/productos", (req, res) =>{
    res.render("inicio", {productos: productos})
})

router.post("/productos", (req, res)=>{
    productos.push(req.body)
    res.redirect("/productos")
})

router.get("/productos/:id" ,(req, res) =>{
    res.send(getProductId(req.params.id))
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

module.exports = router;