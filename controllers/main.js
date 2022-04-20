const getProducts = () => {
    try {
       return productos
    } catch (error) { 
        return `${error}: Productos no encontrados`
    } 
}
const getProductId = (productoId) => {
    try {
        if(productoId < productos.length && productoId > 0){
        let selectedProduct = productos[productoId-1];
        return selectedProduct}
        else{
            return "ERROR: Producto no encontrado"
        }
    } catch (error) { 
        return error
    } 
}
const updateProduct = (producto) => {
    try { 
        let ultimoElemento = productos[productos.length - 1]
        let Id = ultimoElemento.id + 1;
        let newProduct = {...producto, Id};
       return newProduct
    } catch (error) { 
        error
    } 
}
const updateId = (idProducto) => {
    try {
        if (idProducto > 0 && idProducto < productos.length) {
            let selectedObject = productos[idProducto - 1]
            let object= JSON.stringify(selectedObject)
            return  `El objeto ${object} ha sido actualizado`
        } else {
            return `Error: Producto no encontrado`
        }
       return
    } catch (error) { 
        return error
    } 
}

const deleteProduct = (producto) => {
    try {
        let id = producto.id;
        productos.splice(id, 1)
        return productos
    } catch (error) { 
        return error
    }
}

module.exports = {getProducts, getProductId, updateId, updateProduct, deleteProduct}