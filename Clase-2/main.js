let numeroRandom = Math.floor((Math.random() * 100) + 1)



//Con vida
// let intentos = Number(prompt("¿Cuantas intentos quiere tener?"))

// let intentosQueTeQueda = intentos


// for (let i = 0; i < intentos; i++) {
//     let numeroUsuario = Number(prompt("Ingrese un numero entre el 1 y el 100"))

//     intentosQueTeQueda--

//     if(numeroRandom === numeroUsuario){
//         alert("Ganaste")
//         break
//     }else if(numeroRandom > numeroUsuario){
//         alert("Tu numero es menor")
//     }else{
//         alert("Tu numero es mayor")
//     }

// }

// if(intentosQueTeQueda > 0){
//     alert("Perdiste, como el profe estaba perdido hace un rato")
// }else{
//     alert("Te quedaron " + intentosQueTeQueda + " sin usar.")
// }


//Intentos
//Bandera
// let bandera = true
// let contadorDeIntentos = 0

// while(bandera){
//     let numeroUsuario = Number(prompt("Ingrese un numero entre el 1 y el 100"))

//     contadorDeIntentos++
//     if(numeroRandom === numeroUsuario){
//         alert("Ganaste")
//         bandera = false
//     }else if(numeroRandom > numeroUsuario){
//         alert("Tu numero es menor")
//     }else{
//         alert("Tu numero es mayor")
//     }
// }

// alert("Ganaste en " + contadorDeIntentos + " intentos.")

//Resolución por centinela

// let contadorDeIntentos = 1
// let numeroUsuario = Number(prompt("Ingrese un numero entre el 1 y el 100"))

// while(numeroRandom !== numeroUsuario){

//     if(numeroRandom > numeroUsuario){
//         alert("Tu numero es menor")
//         numeroUsuario = Number(prompt("Ingrese un numero entre el 1 y el 100"))
//         contadorDeIntentos++
//     }else{
//         alert("Tu numero es mayor")
//         numeroUsuario = Number(prompt("Ingrese un numero entre el 1 y el 100"))
//         contadorDeIntentos++
//     }

// }

// alert("Ganaste en " + contadorDeIntentos + " intentos.")


let bandera = true

while(bandera){
    let opciones = Number(prompt("Buenas, ¿Que quiere jugar?\n 1- Bucle For\n 2- Bucle while"))

    switch(opciones){
        case 0:
            bandera = false
            break
        case 1:
            let intentosQueTeQueda = 3


            for (let i = 0; i < 3; i++) {
                let numeroUsuario = Number(prompt("Ingrese un numero entre el 1 y el 100"))

                if(numeroRandom === numeroUsuario){
                    alert("Ganaste")
                    break
                }else if(numeroRandom > numeroUsuario){
                    intentosQueTeQueda--
                    alert("Tu numero es menor")
                }else{
                    intentosQueTeQueda--
                    alert("Tu numero es mayor")
                }
            }

            console.log(intentosQueTeQueda)
            if(intentosQueTeQueda == 0){
                alert("Perdiste, como el profe estaba perdido hace un rato")
            }else{
                alert("Te quedaron " + intentosQueTeQueda + " sin usar.")
            }

            bandera = confirm("¿Quiere seguir jugando?")
            break
        case 2:
            let banderaWhile = true
            let contadorDeIntentos = 0

            while(banderaWhile){
                let numeroUsuario = Number(prompt("Ingrese un numero entre el 1 y el 100"))

                contadorDeIntentos++
                if(numeroRandom === numeroUsuario){
                    alert("Ganaste")
                    banderaWhile = false
                }else if(numeroRandom > numeroUsuario){
                    alert("Tu numero es menor")
                }else{
                    alert("Tu numero es mayor")
                }
            }
            alert("Ganaste en " + contadorDeIntentos + " intentos.")
            bandera = confirm("¿Quiere seguir jugando?")
            break
        default:
            alert("No tenemos ese juego")
            bandera = confirm("¿Quiere seguir jugando?")
            break
        }
    numeroRandom = Math.floor((Math.random() * 100) + 1)
    console.log(numeroRandom)
}