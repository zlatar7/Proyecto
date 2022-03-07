class Usuario{
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName(){
        return `El nombre completo es ${this.nombre} ${this.apellido}` 
    }
    addMascota(animal){
        this.mascotas.push(animal)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(libro, autor){
        this.libros.push({libro: libro, autor: autor})
    }
    getBookName(){
        return this.libros.map((item) => item.libro)
    }
}

let persona1 = new Usuario ("Carlos","Perez", [{libro: "Hamlet", autor: "William Shakespeare"}], ["Gato", "Tortuga"])

//NOMBRE
console.log(persona1.getFullName())

//MASCOTAS
persona1.addMascota("Perro")
console.log(persona1.countMascotas())
console.log(persona1.mascotas)

//LIBROS
persona1.addBook("Rayuela", "Julio Cortázar")
console.log(persona1.libros)
console.log(persona1.getBookName())