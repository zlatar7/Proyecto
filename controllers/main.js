const fs = require('fs');
const random = require ('random');

function obtenerProducto (){
    try {
        const contenido =  fs.readFileSync("./Test.txt", "utf-8");
        const info = JSON.parse(contenido);
        return info.map(item =>`<ul><li>${item.id}</li><li>Producto: $${item.title}</li> <li>Precio:${item.price}</li> <li>Imagen:${item.thumbnail}</li></ul>`)
    } catch (error) { 
        console.log(error)
    }
    
}
function obtenerProductoRandom (){
    try {
        const contenido = fs.readFileSync("./Test.txt", "utf-8");
        const info = JSON.parse(contenido);
        //Numero al azar y total de productos del array
        const totalNum = info.length;
        const randomNum = random.int(1, totalNum);

            if (contenido.length > 0) {
                let resultado = info.filter(item=> item.id === randomNum)
                return resultado.map(item=>`Id: ${item.id}</br> Producto: ${item.title}</br> Precio: $${item.price}</br> Imagen: ${item.thumbnail}`) 
            } else {
                console.log(null)
            }
    } catch (error) { 
        console.log(error)
    }
}

module.exports = {obtenerProducto, obtenerProductoRandom};
