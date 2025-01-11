document.getElementById("icono-carrito").addEventListener("click", ()=>{
    document.getElementById("carrito-contenedor").classList.toggle("on")
})
document.getElementById("boton-cerrar").addEventListener("click", ()=>{
    document.getElementById("carrito-contenedor").classList.toggle("on")
})

let Carrito = JSON.parse(localStorage.getItem("carrito")) || []

const Productos = document.getElementById("productos")
const CarritoDOM = document.getElementById("carrito")
const BotonCompra = document.getElementById("boton-comprar")

let ejemplo = `
            <div class="card-carrito">
                <div class="info">
                    <h3>Tabla de cortar</h3>
                    <img src="https://static.vecteezy.com/system/resources/previews/009/887/148/non_2x/wooden-chopping-board-free-png.png" alt="Imagen del Producto">
                    <p>$12.49</p>
                </div>
                <div class="cantidad">
                    <button>-</button>
                    <p>1</p>
                    <button>+</button>
                </div>
            </div>
`

function actualizadoraCarrito(){
    CarritoDOM.innerHTML = ""

    localStorage.setItem("carrito", JSON.stringify(Carrito))

    Carrito.forEach(el => {
        const {nombre, imagen, id, cantidad, precio} = el

        const container = document.createElement("div")
        container.classList.add("card-carrito")

        const info = document.createElement("div")
        const cantidadDOM = document.createElement("div")

        info.classList.add("info")
        cantidadDOM.classList.add("cantidad")

        container.append(info, cantidadDOM)

        const titulo = document.createElement("h3")
        const img = document.createElement("img")
        const precioDOM = document.createElement("p")

        titulo.innerText = nombre
        img.src = imagen
        precioDOM.innerText = "$" + precio

        info.append(titulo, img, precioDOM)

        const botonMas = document.createElement("button")
        const botonMenos = document.createElement("button")
        const cantidadText = document.createElement("p")

        botonMas.innerText = "+"
        botonMenos.innerText = "-"
        cantidadText.innerText = cantidad

        botonMas.addEventListener("click", ()=>{
            let index = Carrito.findIndex(el => el.id == id)

            Carrito[index].cantidad += 1
            actualizadoraCarrito()
        })

        botonMenos.addEventListener("click", ()=>{
            let index = Carrito.findIndex(el => el.id == id)

            if(Carrito[index].cantidad == 1){
                Carrito.splice(index, 1)
            }else{
                Carrito[index].cantidad -= 1
            }

            actualizadoraCarrito()
        })

        cantidadDOM.append(botonMenos, cantidadText, botonMas)

        CarritoDOM.appendChild(container)
    })
}


function creadoraDeCards({id, nombre, precio, imagen, desc}){
    const container = document.createElement("div")
    container.classList.add("producto")

    const titulo = document.createElement("h3")
    const img = document.createElement("img")
    const descDOM = document.createElement("div")
    const precioDOM = document.createElement("p")
    const button = document.createElement("button")


    titulo.innerText = nombre
    img.src = imagen
    descDOM.innerText = desc
    precioDOM.innerText = "$" + precio
    button.innerText = "Comprar"

    container.append(titulo, img, descDOM, precioDOM, button)

    button.addEventListener("click", ()=>{
        let index = Carrito.findIndex(el => el.id == id)
        let cantidad = 1

        if(index == -1){
            Carrito.push({
                nombre,
                imagen,
                precio,
                id,
                cantidad: 1
            })
        }else{
            Carrito[index].cantidad += 1
            cantidad = Carrito[index].cantidad
        }

        actualizadoraCarrito()

        Swal.fire({
            title: nombre + " fue agregado al carrito. Ya tiene en el carrito " + cantidad,
            icon: "success",
            timer: 1600,
            timerProgressBar: true,
            showConfirmButton: false,
            toast: true,
            position: "top-end"
        })
    })

    Productos.appendChild(container)
}

BotonCompra.addEventListener("click", ()=>{
    let total = Carrito.reduce((acc, el)=>{
        return acc + el.precio * el.cantidad
    }, 0)

    if(total == 0){
        return
    }

    Swal.fire({
        title:  "Su compra es en total: " + total.toFixed(2),
        showCancelButton: true,
        cancelButtonText: "No comprar",
        confirmButtonText: "Comprar"
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
                title: "Gracias por su compra ¿Cual es su email?",
                input: "email"
            }).then((result) => {
                console.log(result)
                Carrito = []
                actualizadoraCarrito()
            })
        }else{
            Swal.fire({
                icon: "error",
                title: "Su compra no fue efectuada"
            })
        }
    })
})

document.addEventListener("DOMContentLoaded", async ()=>{
    actualizadoraCarrito()
    const response = await fetch('./data.json')
    const data = await response.json()


    data.forEach(element => {
        creadoraDeCards(element)
    });
})