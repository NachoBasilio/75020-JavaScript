const coderMap = (arreglo, fun) => {
    let newArray = []

    for (let i = 0; i < arreglo.length; i++) {
        newArray.push(fun(arreglo[i], i, "perritoConChaucha"))
    }

    return newArray
}

const coderForEach = (arreglo, fun) => {
    for (let i = 0; i < arreglo.length; i++) {
        fun(arreglo[i], i, "perritoConChaucha")
    }
}

// const arrayDeElementos = Array.from(noArrayDeNodos)

const pseudoPeticion = [
    { nombre: "Cuaderno A4", precio: 450, id: 1, stock: 10 },
    { nombre: "Bolígrafo Azul", precio: 120, id: 2, stock: 10 },
    { nombre: "Lápiz HB", precio: 80, id: 3, stock: 10 },
    { nombre: "Tijeras Escolares", precio: 350, id: 4, stock: 10 },
    { nombre: "Goma de Borrar", precio: 50, id: 5, stock: 10 },
    { nombre: "Regla de 30 cm", precio: 200, id: 6, stock: 10 },
    { nombre: "Resaltador Amarillo", precio: 160, id: 7, stock: 10 },
    { nombre: "Cartulina Blanca", precio: 60, id: 8, stock: 10 },
    { nombre: "Corrector Líquido", precio: 220, id: 9, stock: 10 },
    { nombre: "Marcador Permanente", precio: 180, id: 10, stock: 10 }
]

class Producto{
    constructor(nombre, precio, id, stock){
        this.nombre = nombre
        this.precio = precio
        this.id = id
        this.stock = stock
    }
}


const ArrayDeProductos = pseudoPeticion.map((el)=>{
    return new Producto(el.nombre, el.precio, el.id, el.stock)
})

class Carrito{
    constructor(){
        this.productos = JSON.parse(localStorage.getItem("carrito")) || []
        this.total = 0
    }

    guardadoraLocalStorage(){
        localStorage.setItem("carrito", JSON.stringify(this.productos))
    }

    agregarACarrito(id, cantidad){
        const producto = this.productos.find(el => el.id == id)
        if(producto){
            producto.cantidad += cantidad
        }else{
            ArrayDeProductos[id-1].cantidad = cantidad
            this.productos.push(ArrayDeProductos[id-1])
        }
        this.actualizarTotal()
        this.guardadoraLocalStorage()
    }

    quitarProducto(id, cantidad){
        const index = this.productos.findIndex((el)=> el.id == id)

        if(index == -1){
            alert("El producto no esta en el carrito")
            return
        }

        if(this.productos[index].cantidad <= cantidad){
            this.productos.splice(index, 1)
        }else{
            this.productos[index].cantidad -= cantidad
        }

        this.actualizarTotal()
        this.guardadoraLocalStorage()
    }

    actualizarTotal(){
        this.total = this.productos.reduce((acc, el)=>{
            return acc + el.precio * el.cantidad
        },0)
    }

    verCarrito(){
        this.actualizarTotal()
        if(this.productos.length == 0){
            alert("El carrito no tiene nada uwu")
            return
        }

        let mensaje = this.productos.reduce((acc, el)=>{
            return acc + "\n - " + el.nombre + " $" + el.precio + " ctd: " + el.cantidad
        },"Su carrito es el siguiente:")

        mensaje += "\n\n\nEl total es el siguiente: " + this.total
        alert(mensaje)
    }

    reiniciarCarrito(){
        this.productos = []
        this.total = 0
    }

    terminarCompra(){
        this.verCarrito()
        let confirmacionDePago = false
        let opciones = Number(prompt("¿Qué medio de pago quiere utilizar?\n 1-Efectivo\n 2-Tarjeta débito\n 3-Tarjeta crédito\n 4-Cripto"))

        switch(opciones){
            case 1:
                confirmacionDePago = confirm("Con este método de pago el total quedaría asi: " + (this.total * 0.9).toFixed(2)) + " ¿Quiere confirmar la compra?"
                break
            case 2:
                confirmacionDePago = confirm("Con este método de pago el total quedaría asi: " + (this.total * 0.8).toFixed(2)) + " ¿Quiere confirmar la compra?"
                break
            case 3:
                confirmacionDePago = confirm("Con este método de pago el total quedaría asi: " + (this.total * 1).toFixed(2)) + " ¿Quiere confirmar la compra?"
                break
            case 4:
                confirmacionDePago = confirm("Con este método de pago el total quedaría asi: " + (this.total * 1.3).toFixed(2)) + " ¿Quiere confirmar la compra?"
                break
            default:
                alert("¡No tenemos esa opción!")
                break
        }

        if(confirmacionDePago){
            alert("Gracias por su compra")
            this.reiniciarCarrito()
        }
    }
}

const carritoObjeto = new Carrito()


function MostrarProductos(array){
    let mensaje = array.reduce((acc, el)=>{
        return acc + "\n - " + el.nombre + " $" + el.precio + " id: " + el.id
    },"La lista de productos es la siguiente")

    alert(mensaje)
}

function detallesProducto(id){
    const producto = ArrayDeProductos.find(el => el.id == id)
    if(!producto){
        alert("No tenemos ese producto")
    }
    alert("El detalle de este producto es el siguiente:\n Nombre: " + producto.nombre + "\n Precio: $" + producto.precio + "\n ID: " + producto.id)
}

function filtrarElemento(input){
    const arrayFiltrado = ArrayDeProductos.filter(el => el.nombre.toLowerCase().includes(input.toLowerCase()))
    //const arrayFiltrado = ArrayDeProductos.filter(el => el.nombre === input)
    MostrarProductos(arrayFiltrado)
}

function core(){
    let bandera = true
    while(bandera){
        let opciones = Number(prompt("Bienvenidos a la librería Chaucha con Perrito:\n 1-Ver Productos\n 2-Comprar por id\n 3-Ver Carrito\n 4-Buscar Producto\n 5-Filtrar productos\n 6-Quitar producto del carrito\n 7-Pagar\n 8-Vaciar carrito"))
        switch(opciones){
            case 0:
                bandera = false
                break
            case 1:
                MostrarProductos(ArrayDeProductos)
                bandera = confirm("¿Quiere seguir operando?")
                break
            case 2:
                const id = Number(prompt("¿Me pasas el id del producto?"))
                let cantidad = Number(prompt("¿Me pasas la cantidad del producto a comprar?"))
                if(isNaN(cantidad)){
                    cantidad = 1
                }
                carritoObjeto.agregarACarrito(id,cantidad)
                bandera = confirm("¿Quiere seguir operando?")
                break
            case 3:
                carritoObjeto.verCarrito()
                bandera = confirm("¿Quiere seguir operando?")
                break
            case 4:
                const idBuscador = Number(prompt("¿Me pasas el id del producto?"))
                detallesProducto(idBuscador)
                bandera = confirm("¿Quiere seguir operando?")
                break
            case 5:
                const input = prompt("¿Que producto esta buscando?")
                filtrarElemento(input)
                bandera = confirm("¿Quiere seguir operando?")
                break
            case 6:
                const idElminar = Number(prompt("¿Me pasas el id del producto?"))
                const cantidadAEliminar = Number(prompt("¿Me pasas la cantidad del producto a eliminar?"))
                carritoObjeto.quitarProducto(idElminar, cantidadAEliminar)
                bandera = confirm("¿Quiere seguir operando?")
                break
            case 7:
                carritoObjeto.terminarCompra()
                bandera = confirm("¿Quiere seguir operando?")
                break
            case 8:
                carritoObjeto.reiniciarCarrito()
                bandera = confirm("¿Quiere seguir operando?")
                break
            default:
                alert("No tenemos esa opcion")
                bandera = confirm("¿Quiere seguir operando?")
                break
        }
    }
}

core()

