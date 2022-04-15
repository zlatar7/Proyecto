const productos = [
    {price: 1000, title: "libro", thumbnail: "https://cdn3.iconfinder.com/data/icons/education-and-school-8/48/Book-256.png"},
    {price: 80, title: "lapicera", thumbnail: "https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Sharpie-256.png"},
    {price: 110, title: "regla", thumbnail: "https://cdn3.iconfinder.com/data/icons/education-and-learning-set-2-1/256/47-256.png"},
    {price: 4000, title: "mochila", thumbnail: "https://cdn4.iconfinder.com/data/icons/camping-flat/614/1341_-_Bag-256.png"}
]

function getProducts (){
    try {
       return productos
    } catch (error) { 
        return `${error}: Productos no encontrados`
    } 
}
function getProductId (productoId){
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
function updateProduct (producto){
    try { 
        let ultimoElemento = productos[productos.length - 1]
        let Id = ultimoElemento.id + 1;
        let newProduct = {...producto, Id};
       return newProduct
    } catch (error) { 
        error
    } 
}
function updateId (idProducto){
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

function deleteProduct (producto){
    try {
        let id = producto.id;
        productos.splice(id, 1)
        return productos
    } catch (error) { 
        return error
    }
}

module.exports = {getProducts, getProductId, updateId, updateProduct, deleteProduct, productos}