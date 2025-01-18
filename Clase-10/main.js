const URL = "https://fakestoreapi.com/products"

const Productos = document.getElementById("productos")
const CarritoDOM = document.getElementById("carrito")
const VerMas = document.getElementById("verMas")
const VerMenos = document.getElementById("verMenos")

let ultimoValor = 0
let ProductosArray

const Carrito = []

function pintadoraDeCards({title, price, description, category, image, id}){
    const contenedor = document.createElement("div")
    contenedor.classList.add("contenedor")


    const titulo = document.createElement("h3")
    const costo = document.createElement("p")
    const desc = document.createElement("div")
    const categoria = document.createElement("p")
    const img = document.createElement("img")
    const boton = document.createElement("button")

    titulo.innerText = title
    costo.innerText = "$" + price
    desc.innerText = description
    categoria.innerText = category
    img.src = image
    boton.innerText = "Comprar"

    costo.classList.add("precio")

    boton.addEventListener("click", () => {
        Carrito.push({
            id,
            title,
            price,
            cantidad: 1
        })
    })

    contenedor.append(titulo, desc, categoria, img, costo, boton)

    Productos.appendChild(contenedor)
}


VerMenos.addEventListener("click", (e) => {
    let aux = ultimoValor - 6

    if(ultimoValor - 5 < 6){
        e.target.innerText = "Estas en la primer pagina"
        setTimeout(()=>{
            e.target.innerText = "ver menos..."
        }, 3000)
        return
    }

    Productos.innerHTML = ""

    for (let i = aux - 5; i <= aux; i++) {
        pintadoraDeCards(ProductosArray[i])
        ultimoValor = i
    }


})

VerMas.addEventListener("click", (e)=>{
    let aux = ultimoValor + 1
    if (aux >= ProductosArray.length){
        e.target.innerText = "No hay mas"
        return
    }

    Productos.innerHTML = ""

    if(ultimoValor + 5 > ProductosArray.length){
        for (let i = aux; i < ProductosArray.length; i++) {
            pintadoraDeCards(ProductosArray[i])
            ultimoValor = i
        }
    }else{
        for (let i = aux; i <= aux + 5; i++) {
            pintadoraDeCards(ProductosArray[i])
            ultimoValor = i
        }
    }


    window.scrollTo({ top: 0, behavior: 'smooth' });
})

document.addEventListener("DOMContentLoaded", async ()=>{
    const response = await fetch(URL)
    const data = await response.json()

    ProductosArray = data

    for (let i = 0; i <= 5; i++) {
        pintadoraDeCards(ProductosArray[i])
        ultimoValor = i
    }
})