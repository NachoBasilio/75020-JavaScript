let subTotal = 0;
let total = 0;
let productos = "Los productos que usted compro son los siguientes: ";

/**
 * Valida si el dato proporcionado es un número.
 *
 * @param {*} dato - El dato a validar.
 * @returns {boolean} `true` si el dato es un número, `false` en caso contrario.
 */
function validarDatos(dato) {
    return !isNaN(dato);
}

/**
 * Solicita un número al usuario mediante un mensaje personalizado, valida el valor ingresado
 * y repite la solicitud hasta que el usuario proporcione un número válido.
 *
 * @param {string} pregunta - Mensaje que se mostrará al usuario.
 * @returns {number} El número validado ingresado por el usuario.
 */
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

/**
 * Agrega un producto a la lista de compras, calculando el subtotal acumulado.
 *
 * @param {number} precio - Precio unitario del producto.
 * @param {string} producto - Nombre del producto.
 * @param {number} [cantidad=1] - Cantidad del producto comprado.
 */
function logicaDeCompra(precio, producto, cantidad = 1) {
    subTotal += precio * cantidad;
    productos += `\n- ${producto} X${cantidad} Precio Unitario: ${precio}`;
}

/**
 * Calcula el total a pagar aplicando un descuento al subtotal.
 *
 * @param {number} descuento - Factor de descuento (e.g., 0.9 para 10% de descuento).
 */
function calculoTotalPago(descuento) {
    total = subTotal * descuento;
    alert(
        `Su sub total es de: ${subTotal}, con este medio de pago su total sería: ${total}`
    );
}

/**
 * Muestra un resumen de la compra al usuario y solicita la confirmación del pago.
 * Reinicia los valores globales después de la confirmación.
 */
function confirmacionDePago() {
    let pago = confirm(
        `${productos}\n\n Total: ${total}\n ¿Confirma la compra?`
    );

    if (pago) {
        alert("Gracias por su compra");
    } else {
        alert("No pasa nada, nos vemos la próxima");
    }

    // Reinicia los valores
    total = 0;
    subTotal = 0;
    productos = "Los productos que usted compro son los siguientes: ";
}

/**
 * Gestiona el proceso de pago, ofreciendo al usuario diferentes métodos de pago
 * y aplicando los descuentos correspondientes.
 */
function logicaDePago() {
    let bandera = true;

    while (bandera) {
        let opciones = logicaDeValidacion(
            "¿Qué medio de pago quiere utilizar?\n 1-Efectivo\n 2-Tarjeta débito\n 3-Tarjeta crédito\n 4-Cripto"
        );

        switch (opciones) {
            case 0:
                return
            case 1:
                calculoTotalPago(0.9);
                bandera = !confirm("¿Quieres usar este medio de pago?");
                break;
            case 2:
                calculoTotalPago(1);
                bandera = !confirm("¿Quieres usar este medio de pago?");
                break;
            case 3:
                calculoTotalPago(1.1);
                bandera = !confirm("¿Quieres usar este medio de pago?");
                break;
            case 4:
                calculoTotalPago(1.5);
                bandera = !confirm("¿Quieres usar este medio de pago?");
                break;
            default:
                alert("No tenemos esa opción");
        }
    }

    confirmacionDePago();
}

/**
 * Función principal que gestiona el flujo de la tienda, permitiendo al usuario
 * agregar productos al carrito y decidir si desea continuar comprando.
 */
function core() {
    let bandera = true;

    while (bandera) {
        let opciones = logicaDeValidacion(
            "Bienvenidos a la tienda 'Perrito con Chaucha', lo que tenemos a la venta es lo siguiente\n 1-Remera\n 2-Pantalón\n 3-Buzo\n 4-Perrito"
        );

        let cantidad = 1;

        switch (opciones) {
            case 0:
                return
            case 1:
                cantidad = logicaDeValidacion("¿Cuántas Remeras quieres comprar?");
                logicaDeCompra(100, "Remera", cantidad);
                bandera = confirm("¿Quieres seguir comprando?");
                break;
            case 2:
                cantidad = logicaDeValidacion("¿Cuántos Pantalones quieres comprar?");
                logicaDeCompra(200, "Pantalón", cantidad);
                bandera = confirm("¿Quieres seguir comprando?");
                break;
            case 3:
                cantidad = logicaDeValidacion("¿Cuántos Buzos quieres comprar?");
                logicaDeCompra(500, "Buzo", cantidad);
                bandera = confirm("¿Quieres seguir comprando?");
                break;
            case 4:
                cantidad = logicaDeValidacion("¿Cuántos Perritos quieres comprar?");
                logicaDeCompra(1500, "Perrito", cantidad);
                bandera = confirm("¿Quieres seguir comprando?");
                break;
            default:
                alert("No tenemos esa opción");
                bandera = confirm("¿Quieres seguir comprando?");
        }
    }
}

// Inicia la aplicación
core();

if (subTotal > 0) {
    logicaDePago();
}
