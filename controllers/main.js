const productos = [ {"price":100, "title":"calculadora", "thumbnail":"www.calculadora.com","id":1},
                    {"price": 150 , "title":"mochila", "thumbnail":"www.mochila.org", "id": 2},
                    {"price": 125, "title":"lapiz", "thumbnail":"www.lapiz.com.ar", "id":3},
                    {"price": 200, "title":"regla", "thumbnail":"www.regla.jpg.com", "id":4}]

export function getProducts (){
    try {
       return productos
    } catch (error) { 
        return `${error}: Productos no encontrados`
    } 
}
export function getProductId (productoId){
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
export function updateProduct (producto){
    try { 
        let ultimoElemento = productos[productos.length - 1]
        let Id = ultimoElemento.id + 1;
        let newProduct = {...producto, Id};
       return newProduct
    } catch (error) { 
        error
    } 
}
export function updateId (idProducto){
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

export function deleteProduct (producto){
    try {
        let id = producto.id;
        productos.splice(id, 1)
        return productos
    } catch (error) { 
        return error
    }
}
