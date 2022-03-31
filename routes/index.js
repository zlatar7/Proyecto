import {Router} from "express";
import {getProducts, getProductId, updateProduct, updateId, deleteProduct} from "../controllers/main.js";

const router = Router();

router.get("/productos" ,(req, res) =>{
    res.send(getProducts())
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

export default router;