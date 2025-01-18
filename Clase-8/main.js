const API_PRIMERA_GEN = "https://pokeapi.co/api/v2/pokemon?limit=151"
const API_UN_POKEMON = "https://pokeapi.co/api/v2/pokemon/"

const PokemonList = document.getElementById("pokemon_list")
const EquipoDOM = document.getElementById("equipo")
const FormularioDeBusqueda = document.getElementById("formulario_pokemon")

let Equipo = JSON.parse(localStorage.getItem("equipo-pokemon")) || []


FormularioDeBusqueda.addEventListener("submit", async (event)=>{
    event.preventDefault()
    try{

        const pokemonABuscar = event.target[0].value

        if(pokemonABuscar === ""){
            PokemonList.innerHTML = ""
            PokemonList.innerHTML ="<h3>Ese pokemon no esta</h3>"
            return
        }

        const response = await fetch(API_UN_POKEMON + pokemonABuscar)

        if(!response.ok){
            PokemonList.innerHTML = ""
            PokemonList.innerHTML ="<h3>Ese pokemon no esta</h3>"
            throw new Error("Ese pokemon no esta")
        }

        const data = await response.json()

        PokemonList.innerHTML = ""
        creadoraDeCards(data)
        agregadoraDeEventos()
    }catch(error){
        console.error(error)
    }
})

function creadoraDeCardsEquipo(pokemon){
    EquipoDOM.innerHTML += `
        <div class="pokemon-card">
            <div class="titulo">
                <h2 class="nombre">${pokemon.name}</h2>
                <h2 class="numero">${pokemon.id}</h2>
            </div>
            <div class="imagen" >
                <img src="${pokemon.sprites.front_default}" alt="">
            </div>
            <p>${pokemon.abilities[0].ability.name}</p><p>${pokemon?.abilities[1]?.ability.name || ""}</p><p>${pokemon?.abilities[2]?.ability.name || ""}</p>
            <button class="botonEliminar">X</button>
        </div>
`
}


function creadoraDeCards(pokemon){
    PokemonList.innerHTML += `
        <div class="pokemon-card">
            <div class="titulo">
                <h2 class="nombre">${pokemon.name}</h2>
                <h2 class="numero">${pokemon.id}</h2>
            </div>
            <div class="imagen" >
                <img src="${pokemon.sprites.front_default}" alt="">
            </div>
            <p>${pokemon.abilities[0].ability.name}</p><p>${pokemon?.abilities[1]?.ability.name || ""}</p><p>${pokemon?.abilities[2]?.ability.name || ""}</p>
            <button class="botonAgregar">Agregar</button>
        </div>
`
}


function agregadoraDeEventos(){
    const botones = document.getElementsByClassName("botonAgregar")
    const botonesArray = Array.from(botones)

    botonesArray.forEach(el => {
        el.addEventListener("click", async ()=>{
            Equipo.push(el.parentElement.children[0].children[1].innerText)
            await actualizarEquipo()
        })
    })
}

function agregadoraDeEventosEliminar(){
    const botones = document.getElementsByClassName("botonEliminar")
    const botonesArray = Array.from(botones)

    botonesArray.forEach(el => {
        el.addEventListener("click", async (event) => {
            Equipo = Equipo.filter(el => el != event.target.parentElement.children[0].children[1].innerText)
            actualizarEquipo()
        })
    })
}


async function actualizarEquipo() {
    EquipoDOM.innerHTML = ""
    Equipo.forEach(async (el) => {
        const response = await fetch(API_UN_POKEMON + el)
        const data = await response.json()
        creadoraDeCardsEquipo(data)
        agregadoraDeEventosEliminar()
    })
    localStorage.setItem("equipo-pokemon", JSON.stringify(Equipo))
}


document.addEventListener("DOMContentLoaded", async () => {
    try {
        actualizarEquipo()
        const response = await fetch(API_PRIMERA_GEN)

        if(!response.ok){
            throw new Error("La respuesta no fue aceptada")
        }

        const data = await response.json()

        const pokemonDetalles = await Promise.all(
            data.results.map(async (el) => (await fetch(el.url)).json())
        )

        pokemonDetalles.forEach(el => {
            creadoraDeCards(el)
        })

        agregadoraDeEventos()
    } catch (error) {
        console.error(error)
    }
})
