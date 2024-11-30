const Alumnos = [{
    nombre: "Tomas",
    apellido: "Iezzi",
    dni: 1,
    edad: 17,
    materias: [
        {
            materia: "Matematica",
            nota: 10
        },
        {
            materia: "Lengua",
            nota: 7
        }
    ]
}]

function validarDatos(dato) {
    return !isNaN(dato);
}

function logicaDeValidacion(pregunta) {
    let numero = Number(prompt(pregunta));
    let validado = validarDatos(numero);

    while (!validado) {
        alert("Eso no es un número");
        numero = Number(prompt(pregunta));
        validado = validarDatos(numero);
    }

    return numero;
}

function creadoraDeArrayDeDNI(){
    const ArrayDNI = []

    for (let i = 0; i < Alumnos.length; i++) {
        ArrayDNI.push(Alumnos[i].dni)
    }

    return ArrayDNI
}

function buscadoraDeIndice(dni){
    const ArrayDNI = creadoraDeArrayDeDNI()

    const index = ArrayDNI.indexOf(dni)

    return index
}


function agregarAlumno(nombre, apellido, dni, edad){
    Alumnos.push({
        nombre,
        apellido,
        dni,
        edad,
        materias: []
    })
}

function creadoraDeArrayDeMaterias(index){
    let NombresMaterias = []

    let MateriasAlumno = Alumnos[index].materias
    for (let i = 0; i < MateriasAlumno.length; i++) {
        NombresMaterias.push(MateriasAlumno[i].materia)
    }
    return NombresMaterias
}

function evitadoraDeRepetirMaterias(index, materia){

    NombresMaterias = creadoraDeArrayDeMaterias(index)

    let materiaExiste = NombresMaterias.includes(materia)

    return materiaExiste

}

function agregarNota(materia, nota, dni){
    const index = buscadoraDeIndice(dni)

    if(index == -1){
        alert("El alumno no esta en nuestra base de datos")
    }else{
        const materiaExiste = evitadoraDeRepetirMaterias(index, materia)

        if(materiaExiste){

            NombresMaterias = creadoraDeArrayDeMaterias(index)
            let indexMateria = NombresMaterias.indexOf(materia)

            Alumnos[index].materias[indexMateria].nota = nota

        }else{
            Alumnos[index].materias.push({
                materia,
                nota
            })
        }

    }
}

function calculoDePromedio(dni){
    const index = buscadoraDeIndice(dni)

    const Materias = Alumnos[index].materias

    let totalNotas = 0

    for (let i = 0; i < Materias.length; i++) {
        // totalNotas = Materias[i].nota + totalNotas
        totalNotas += Materias[i].nota
    }

    let promedio = (totalNotas / Materias.length).toFixed(2)
    alert("El promedio de " + Alumnos[index].nombre + " " + Alumnos[index].apellido + " es igual a: " + promedio)
}

function eliminarAlumno(dni){
    const index = buscadoraDeIndice(dni)

    const confirmacion = confirm("¿Estas seguro de que quieres eliminar a: " + Alumnos[index].nombre + " " + Alumnos[index].apellido + " DNI: " + Alumnos[index].dni)

    if(confirmacion){
        alert("Se elimino el alumno: " + Alumnos[index].nombre)
        Alumnos.splice(index, 1)
    }else{
        alert("¡Perfecto! No se elimino a " + Alumnos[index].nombre)
    }
}

function mostrarAlumnos(){
    let mensaje = "Los alumnos que tenemos en nuestra base de datos son los siguientes: "

    for (let i = 0; i < Alumnos.length; i++) {
        mensaje += "\n Nombre Completo: " + Alumnos[i].nombre + " " + Alumnos[i].apellido + " DNI: " + Alumnos[i].dni
    }

    alert(mensaje)
}

function core(){
    let bandera = true

    while(bandera){
        let opciones = logicaDeValidacion("Bienvenidos a CoderHouse, que quiere hacer:\n 1-Agregar Alumno\n 2-Agregar Nota\n 3-Eliminar Alumno\n 4-Mostrar Promedio\n 5-Mostrar Alumnos")
        let dni


        if((opciones != 0 && opciones != 5) && (opciones >= 0 && opciones < 6)){
            dni = logicaDeValidacion("¿Cual es el dni del alumno?")
        }

        switch(opciones){
            case 0:
                return
            case 1:
                let index = buscadoraDeIndice(dni)
                if(index == -1){
                    let nombre = prompt("¿Como es el nombre del alumno?")
                    let apellido = prompt("¿Como es el apellido del alumno?")
                    let edad = logicaDeValidacion("¿Cual es edad del alumno?")
                    agregarAlumno(nombre, apellido, dni, edad)
                }else{
                    alert("Ese DNI ya esta en uso")
                }
                bandera = confirm("¿Quiere seguir operando?")
                break
            case 2:
                let materia = prompt("¿Como es el nombre de la materia?")
                let nota = logicaDeValidacion("¿Cual es la nota?")

                agregarNota(materia, nota, dni)
                bandera = confirm("¿Quiere seguir operando?")
                break
            case 3:
                eliminarAlumno(dni)
                bandera = confirm("¿Quiere seguir operando?")
                break
            case 4:
                calculoDePromedio(dni)
                bandera = confirm("¿Quiere seguir operando?")
                break
            case 5:
                mostrarAlumnos()
                bandera = confirm("¿Quiere seguir operando?")
                break
            default:
                alert("No tenemos esa opción")
                bandera = confirm("¿Quiere seguir operando?")
                break
        }
    }
}


core()