const { promises } = require("fs")

const date = () =>{ return new Date().toDateString()}

    //Funcion para saber el length del array de productos
const array = async () =>{
    const contenido = await promises.readFile("./Productos.txt", "utf-8")
    const info = JSON.parse(contenido)
        return info.length
}
    //Variable del Length de todos los productos
const allProducts = array();


//                          FUNCIONES PARA LAS RUTAS DE "API/PRODUCTOS"

const getProducts = async () => {
    const contenido = await promises.readFile("./Productos.txt", "utf-8")
    const info = JSON.parse(contenido)

        return console.log(info)
}
const getProductId = async (productoId) => {
    const contenido = await promises.readFile("./Productos.txt", "utf-8");
    const info = JSON.parse(contenido)

        try{
        const producto = info.filter(item => item.id === productoId)
        return console.log(producto)

    } catch {
        return "ERROR: Producto no encontrado"
    }}


const createProduct = async (producto) => {
    try {
        const contenido = await promises.readFile("./Productos.txt", "utf-8")
        const info = JSON.parse(contenido)

            //Asiganción del ID al producto
        const ultimoElemento = info[info.length -1];
        const id = ultimoElemento.id + 1;
        const productoConId = {...producto, id};

            //Se agrega el producto al array 
        const arrayCompleto = JSON.stringify([...info, productoConId]);
        await promises.writeFile("./Productos.txt", arrayCompleto)

        console.log(`Se ha agregado el producto con el ID: ${id}`)
        console.log(JSON.parse(arrayCompleto))
        }            
    catch (error) {
        console.log(error)
        }
}
const updateById = async (idProducto, nuevoProducto) => {

        if (idProducto > 0 && idProducto <= array()) {

            const contenido = await promises.readFile("./Productos.txt", "utf-8")
            const info = JSON.parse(contenido)
                //Selección y reemplazo del producto por id
            const indexElemento = idProducto - 1;
            info.splice(indexElemento, 1)
                //Agrega el nuevo producto al array
            const arrayFinal = JSON.stringify([...info, nuevoProducto]);

            await promises.writeFile("./Productos.txt", arrayFinal)

            return  console.log(`El objeto ha sido actualizado. Nueva lista de productos: ${arrayFinal}`)
        } else {
            return `Error: Producto no encontrado`
        }
}

const deleteProduct = async (id) => {
    try {
        const contenido = await promises.readFile("./Productos.txt", "utf-8")
        const info = JSON.parse(contenido)
            //Elimina producto segun el ID
        const index = id - 1; 
        info.splice(index , 1)

        const arrayFinal = JSON.stringify(info)
        await promises.writeFile("./Productos.txt", arrayFinal)

        return console.log(arrayFinal)

    } catch (error) { 
        return error
    }
}

//              FUNCIONES PARA LAS RUTAS DE "API/CARRITO"

const createCarrito = async (productos) => {

    const time = date();

    try {
        const contenido = await promises.readFile("./carrito.txt", "utf-8")

        const id = contenido.length
        const CarritoNuevo = [{"id": id, "timestamp": time, "productos": productos}]
        const carrito = JSON.stringify(CarritoNuevo)

        await promises.writeFile("./carrito.txt", carrito)
        
    } catch (error) {
        console.log(error)
    }


}
const deleteCarrito = async (idCarrito) => {
    try {
        const contenido = await promises.readFile("./carrito.txt", "utf-8")
        const info = JSON.parse(contenido)
            //Elemento eliminado
        info.splice(idCarrito - 1, 1)
        const nuevoArray = JSON.stringify(info)
        
        await promises.writeFile("./carrito.txt", nuevoArray)

        return console.log(nuevoArray)
        
    } catch (error) {
        console.log(error)
    }

}
const getCarrito = async (id) => {

    try {
        const contenido = await promises.readFile("./carrito.txt", "utf-8")
        const info = JSON.parse(contenido)

        return console.log(contenido)
        
    } catch (error) {
        console.log(error)
    }
}
const addProduct= async (producto) => {

    try {
        const contenido = await promises.readFile("./carrito.txt", "utf-8")
        const info = JSON.parse(contenido)

        const arrayNuevo = [...info, producto]
        const arrayFinal = JSON.stringify(arrayNuevo)

        await promises.writeFile("./carrito.txt", arrayFinal)

        return console.log(arrayFinal)
    } catch (error) {
        console.log(error)
    }
}
const deleteProductCarrito = async (ids) => {

    // LLEGA UN SOLO PARAMETRO
    console.log(ids)

    try {
        const contenido = await promises.readFile("./carrito.txt", "utf-8")
        const info = JSON.parse(contenido)
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getProducts, getProductId, updateById, createProduct, deleteProduct, allProducts, createCarrito, deleteCarrito, getCarrito, addProduct, deleteProductCarrito}