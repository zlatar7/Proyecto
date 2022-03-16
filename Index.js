const { Console } = require('console');
const fs = require('fs');

class Contenedor{
    constructor (title, price, thumbnail) {
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }

    static async save(objeto){
        try {
            const contenido = await fs.promises.readFile("./Test.txt", "utf-8")
            const info = JSON.parse(contenido)
                //Asiganción del ID al objeto
            const ultimoElemento = info[info.length -1];
            const id = ultimoElemento.id + 1;
            const objetoConId = {...objeto, id};
                //Se agrega el objeto al array 
            const arrayCompleto = JSON.stringify([...info, objetoConId]);

            fs.writeFileSync("./Test.txt", arrayCompleto)
            console.log("Se ha agregado el producto")
            console.log(`El ID asignado es ${id}`)
            }            
        catch (error) {
            console.log(error)
            }
    }

    static async getById(numId){
        try {
            const contenido = await fs.promises.readFile("./Test.txt", "utf-8");
            const info = JSON.parse(contenido);

                if (numId <= info.length && numId > 0) {
                    console.log(info.filter(item => item.id === numId))
                } else {
                    console.log(null)
                }
          
        } catch (error) {
            console.log(error)
        }
    }

    static async getAll(){
        try {
            const contenido = await fs.promises.readFile("./Test.txt", "utf-8");
            const info = JSON.parse(contenido);
            console.log(info)
        } catch (error) { 
            console.log(error)
        }
    }

    static async deleteById(numId){
        try {
            const contenido = await fs.promises.readFile("./Test.txt", "utf-8");
            const info = JSON.parse(contenido);

            if (info.some(item=>item.id === numId)) {
                //Elimina el elemento del array
                const nuevoArray = info.filter((item) =>item.id !== numId);

                const resultado = JSON.stringify(nuevoArray)
                fs.writeFileSync("./Test.txt", resultado)
                console.log("El producto seleccionado ha sido eliminado")
            } else {
                console.log("No existe el ID ingresado")                
            }
        } catch (error) {
            console.log(error)
        }
    }

    static deleteAll(){
        try {
            const arrayVacio = JSON.stringify([])
            fs.writeFileSync("./Test.txt", arrayVacio)
            console.log("Todos los productos han sido eliminados")
        } catch (error) {
            console.log(error)
        }
    }
}

//Prueba de la función Save()
 Contenedor.save({title:"pelotas", precio: 200, thumbnail: "https://google.com.ar"});
    //Se utiliza el SetTimeout asi no se superpone con el primer producto a guardar
setTimeout(()=>{Contenedor.save({title:"transportador", precio: 100, thumbnail: "https://fotos.com.ar"})},1000)

//Prueba de la función GetById()
Contenedor.getById(1);

//Prueba de la función GetAll()
Contenedor.getAll();

//Prueba de la función DeleteById()
Contenedor.deleteById(3);

//Prueba de la función DeleteAll()
Contenedor.deleteAll();