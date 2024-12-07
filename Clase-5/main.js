const productosLibreria = [
    { nombre: "Cuaderno A4", precio: 450, id: 1, stock: 43 },
    { nombre: "Bolígrafo Azul", precio: 120, id: 2, stock: 43},
    { nombre: "Lápiz HB", precio: 80, id: 3, stock: 43},
    { nombre: "Tijeras Escolares", precio: 350, id: 4, stock: 43},
    { nombre: "Goma de Borrar", precio: 50, id: 5, stock: 43},
    { nombre: "Regla de 30 cm", precio: 200, id: 6, stock: 43},
    { nombre: "Resaltador Amarillo", precio: 160, id: 7, stock: 43},
    { nombre: "Cartulina Blanca", precio: 60, id: 8, stock: 43},
    { nombre: "Corrector Líquido", precio: 220, id: 9, stock: 43},
    { nombre: "Marcador Permanente", precio: 180, id: 10, stock: 43}
]

class ProductoDesdeClase{
    constructor(nombre, precio, id, stock){
        this.nombre = nombre
        this.precio = precio
        this.id = id
        this.stock = stock
        this.cantidad = 0
    }

    mostrarProducto(){
        alert(this.nombre + " " + this.precio)
    }
}


function mapParaProductos(){
    const arrAux = []

    for(let i = 0; i < productosLibreria.length; i++){
        const productoAPartirDeLaClase = new ProductoDesdeClase(productosLibreria[i].nombre, productosLibreria[i].precio, productosLibreria[i].id, productosLibreria[i].stock )

        arrAux.push(productoAPartirDeLaClase)
    }

    return arrAux
}

const productosLibreriaClase = mapParaProductos()

class Carrito{
    constructor(){
        this.productos = []
        this.productosID = []
        this.total = 0
    }

    agregarProducto(id, cantidad = 1){
        this.creadoraDeArrayDeID()

        let index = this.productosID.indexOf(id)

        let stockDecremento = this.decrementarStock(cantidad, id)

        if(!stockDecremento){
            alert("No tenemos suficiente stock")
            return
        }

        if(index == -1){
            productosLibreriaClase[id - 1].cantidad = cantidad
            this.productos.push(productosLibreriaClase[id - 1])
            this.creadoraDeArrayDeID()
        }else{
            this.productos[index].cantidad += cantidad
        }
        this.calculadoraDeTotal()
    }

    quitarProducto(id, cantidad = 1){
        let index = this.productosID.indexOf(id)

        if(index == -1){
            alert("No esta el producto")
            return
        }

        if(this.productos[index].cantidad < cantidad){
            alert("No tenes tanto agregado de ese producto, por ende lo eliminamos totalmente del carrito")
            this.productos.splice(index, 1)
            this.sumarStock(this.productos[index].cantidad, id)
            this.creadoraDeArrayDeID()
            return
        }

        if(this.productos[index].cantidad <= 1){
            this.productos.splice(index, 1)
            this.sumarStock(cantidad, id)
            this.creadoraDeArrayDeID()
        }else{
            this.sumarStock(cantidad, id)
            this.productos[index].cantidad -= cantidad
        }
        this.calculadoraDeTotal()
    }

    decrementarStock(cantidad, id){
        if(productosLibreriaClase[id - 1].stock < cantidad){
            return false
        }else{
            productosLibreriaClase[id - 1].stock -= cantidad
            return true
        }
    }

    sumarStock(cantidad, id){
        productosLibreriaClase[id - 1].stock += cantidad
    }

    verProductosEnCarrito(mensajePersonalizado){
        let mensaje = mensajePersonalizado + "\n"
        if(this.productos.length > 0){
            for (let i = 0; i < this.productos.length; i++) {
                mensaje += "\n" + this.productos[i].nombre + "  $" + this.productos[i].precio + "  CTD: " + this.productos[i].cantidad
            }
            mensaje += "\n\n\nEl total es: " + this.total
            alert(mensaje)
        }else{
            alert("El carrito esta vació")
        }
    }

    terminarCompra(){
        this.verProductosEnCarrito("El total de la compra es la siguiente: ")
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
            this.productos = []
            this.creadoraDeArrayDeID()
            this.calculadoraDeTotal()
        }
    }

    creadoraDeArrayDeID(){
        this.productosID = []
        for (let i = 0; i < this.productos.length; i++) {
            this.productosID.push(this.productos[i].id)
        }
    }

    calculadoraDeTotal(){
        this.total = 0
        for (let i = 0; i < this.productos.length; i++) {
            this.total += this.productos[i].precio * this.productos[i].cantidad
        }
    }
}

const CarritoInstance = new Carrito()

console.log(CarritoInstance)

function mostrarProductos(){
    let mensaje = "Estos son los productos que tenemos hoy:\n"

    for(let i = 0; i < productosLibreriaClase.length; i++){
        mensaje += "\nNombre: " + productosLibreriaClase[i].nombre + " $" + productosLibreriaClase[i].precio + " - ID: " + productosLibreriaClase[i].id
    }

    alert(mensaje)

}

function core(){
    let bandera = true
    while(bandera){
        let opciones = Number(prompt("Bienvenidos a 'Perrito con Chaucha - Store': \n 1-Ver productos \n 2-Comprar a partir de ID \n 3-Ver carrito \n 4-Eliminar producto (ID) \n 5-Terminar Compra"))

        switch(opciones){
            case 0:
                bandera = false
                break
            case 1:
                mostrarProductos()
                bandera = confirm("¿Quiere seguir comprando?")
                break
            case 2:
                let idAgregar = Number(prompt("Deme el id del producto"))
                let catidadAAgregar = Number(prompt("Deme la cantidad del producto que quiere comprar"))
                CarritoInstance.agregarProducto(idAgregar, catidadAAgregar)
                bandera = confirm("¿Quiere seguir comprando?")
                break
            case 3:
                CarritoInstance.verProductosEnCarrito("Su carrito tiene lo siguiente:")
                bandera = confirm("¿Quiere seguir comprando?")
                break
            case 4:
                let idQuitar = Number(prompt("Deme el id del producto"))
                let catidadAElimnar = Number(prompt("Deme la cantidad del producto que quiere comprar"))
                CarritoInstance.quitarProducto(idQuitar, catidadAElimnar)
                bandera = confirm("¿Quiere seguir comprando?")
                break
            case 5:
                CarritoInstance.terminarCompra()
                bandera = confirm("¿Quiere seguir comprando?")
                break
            default:
                alert("No tenemos esa opción")
                bandera = confirm("¿Quiere seguir comprando?")
                break
        }
    }
}

core()