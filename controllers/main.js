const fs = require("fs")

const date = () =>{ return new Date().toDateString()}

//                          Funcion para saber el length del array de productos
const array = () =>{
    const contenido = fs.readFileSync("./Productos.txt", "utf-8")
    const info = JSON.parse(contenido)
        return info.length
}
//                          Variable del Length de todos los productos
const allProducts = array();


//     ----------------------------FUNCIONES PARA LAS RUTAS DE "API/PRODUCTOS"-----------------------------------

const getProducts = () => {
    const contenido = fs.readFileSync("./Productos.txt", "utf-8")
    const info = JSON.parse(contenido)
        return info
}
const getProductId = (productoId) => {
    const contenido = fs.readFileSync("./Productos.txt", "utf-8");
    const info = JSON.parse(contenido)

        try{
        const producto = info[productoId - 1]
        return producto

    } catch {
        return "ERROR: Producto no encontrado"
    }}


const createProduct = (producto) => {
    try {
        const contenido = fs.readFileSync("./Productos.txt", "utf-8")
        const info = JSON.parse(contenido)

            //Asiganción del ID al producto
        const id = info.length + 1;
        const productoConId = {...producto, id};

            //Se agrega el producto al array 
        const arrayCompleto = JSON.stringify([...info, productoConId]);
        
        fs.writeFileSync("./Productos.txt", arrayCompleto)

        return JSON.parse(arrayCompleto)
        }            
    catch (error) {
        console.log(error)
        }
}
const updateById = (nuevoProducto) => {

        if (nuevoProducto.id > 0 && nuevoProducto.id <= array()) {

            const contenido = fs.readFileSync("./Productos.txt", "utf-8")
            const info = JSON.parse(contenido)
            const id = nuevoProducto.id

            info.splice(id - 1, 1, nuevoProducto)

            const arrayFinal = JSON.stringify(info)
            fs.writeFileSync("./Productos.txt", arrayFinal)

            return  info
        } else {
            return `Error: Producto no encontrado`
        }
}

const deleteProduct = (id) => {
    try {
        const contenido = fs.readFileSync("./Productos.txt", "utf-8")
        const info = JSON.parse(contenido)
            //Elimina producto segun el ID
        const index = id - 1; 
        info.splice(index , 1)

        const arrayFinal = JSON.stringify(info)
        fs.writeFileSync("./Productos.txt", arrayFinal)

        return info

    } catch (error) { 
        return error
    }
}

//      -----------------------FUNCIONES PARA LAS RUTAS DE "API/CARRITO"---------------------------------------

//                                          MÉTODOS POST


const addProduct = (producto, id) => {
    
    try {
        const contenido = fs.readFileSync("./carrito.txt", "utf-8")
        const info = JSON.parse(contenido)

        const productoIngresado = {"id":id,"timestamp": date(), producto}
        
        info.splice(id, 1, productoIngresado)

        const arrayFinal = JSON.stringify([...info, productoIngresado])

        fs.writeFileSync("./carrito.txt", arrayFinal)

        return info

    } catch (error) {
        console.log(error)
    }
}

const createCarrito = (productos) => {

    const time = date();

    try {
        const contenido = fs.readFileSync("./carrito.txt", "utf-8")
        const info = JSON.parse(contenido)
        
        const ultimoElemento = info[info.length - 1]
        const id = ultimoElemento.id + 1
        const carritoNuevo = {"id": id, "timestamp": time, "productos": productos}
        const carrito = JSON.stringify([...info, carritoNuevo])

        fs.writeFileSync("./carrito.txt", carrito)
  
        return `El ID del carrito es: ${id}`

    } catch (error) {
        console.log(error)
}

//                                        MÉTODOS DELETE
}
const deleteCarrito = (idCarrito) => {
    try {
        const contenido = fs.readFileSync("./carrito.txt", "utf-8")
        const info = JSON.parse(contenido)

        // Búsqueda de la variable para el condicional
        const arrayIds = info.map(item => item.id)
        const carritoSeleccionado = arrayIds.filter(item => item == idCarrito)

        if (idCarrito == carritoSeleccionado) {
            
            //Elemento eliminado
            info.splice(idCarrito, 1)
            
            const arrayFinal = JSON.stringify(info)
            fs.writeFileSync("./carrito.txt", arrayFinal)
    
            return `El carrito con el ID: ${idCarrito} ha sido eliminado`

        } else {
            return `No existe carrito con el ID: ${idCarrito}`
        }
        
    } catch (error) {
        console.log(error)
    }

}

const deleteProductCarrito = (id, id_prod) => {

    const contenido = fs.readFileSync("./carrito.txt", "utf-8")
    const info = JSON.parse(contenido)

    if(id >= 0 && id < info.length){

        const carritoSeleccionado = info.filter(item=> item.id == id)
        const productos = carritoSeleccionado.map(item=> item.productos)
        const productoCarrito = productos[0]
        
        //Elimina el producto
        productoCarrito.splice(id_prod - 1, 1)

        const objetoFinal = JSON.stringify(info)
        fs.writeFileSync("./carrito.txt", objetoFinal)

        return info
    } else{
        console.log("Error: el ID ingresado no corresponde con ningún ID de carrito")
    }
}

//                                      MÉTODO GET
const getCarrito = (id) => {

    const contenido = fs.readFileSync("./carrito.txt", "utf-8")
    const info = JSON.parse(contenido)
    
    if (id < info.length && id >= 0) {

        return info[id]
        
    } else {
        return "El ID ingresado no se corresponde con los carritos existentes"
    }
}

module.exports = {getProducts, getProductId, updateById, createProduct, deleteProduct, allProducts, createCarrito, deleteCarrito, getCarrito, addProduct, deleteProductCarrito}