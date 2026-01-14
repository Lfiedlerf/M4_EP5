/* M4_EP5: Funciones Callback y Asincronía*/

// ==========================================
// 1. EJERCICIO: VALIDAR NÚMERO
// ==========================================

// Función Principal que recibe un callback
function validar_numero(callback) {
    const input = prompt("Ingrese un número para validar:");
    
    // Validación: si es vacío o no es un número
    if (input === null || input.trim() === "" || isNaN(input)) {
        // Llamamos al callback pasando el error
        callback(false, input); 
    } else {
        // Llamamos al callback pasando el éxito y el número convertido
        callback(true, Number(input));
    }
}

// El Callback definido (qué hacer con el resultado)
const callbackValidacion = (esValido, valor) => {
    if (esValido) {
        console.log(`Correcto: El dato ${valor} es un número válido.`);
        alert(`Correcto: El dato ${valor} es un número válido.`);
    } else {
        console.error(`Error: "${valor}" son caracteres incorrectos.`);
        alert("Error: Usted ingresó caracteres incorrectos.");
    }
};

// Función gatilladora para el botón HTML
function ejecutarEjercicio1() {
    validar_numero(callbackValidacion);
}


// ==========================================
// 2. EJERCICIO: SUMA IMPARES CON DELAY
// ==========================================

function calcular_y_avisar_despues(numero, callback) {
    console.log(`Calculando sumatoria de impares hasta ${numero}... Espere 5 segundos.`);
    document.getElementById('status-ej2').innerText = "Calculando... espere 5s";

    let suma = 0;
    // Lógica: Sumar solo impares (1, 3, 5...)
    for (let i = 1; i <= numero; i++) {
        if (i % 2 !== 0) {
            suma += i;
        }
    }

    // Asincronía: setTimeout
    setTimeout(() => {
        // Ejecutamos el callback pasando el resultado final
        callback(suma); 
    }, 5000);
}

// Callback para mostrar el mensaje específico
const avisoDespues = (resultado) => {
    const mensaje = `El valor de la sumatoria es ${resultado}. Este resultado se obtuvo hace 5 segundos.`;
    console.log(mensaje);
    alert(mensaje);
    document.getElementById('status-ej2').innerText = "Proceso finalizado. Ver consola.";
};

function ejecutarEjercicio2() {
    const num = parseInt(document.getElementById('num-ej2').value);
    if(isNaN(num)) return alert("Ingrese un número válido");
    
    calcular_y_avisar_despues(num, avisoDespues);
}


// ==========================================
// 3. EJERCICIO: SUMATORIAS SUCESIVAS
// ==========================================

function calcular_y_avisar_dependiendo(numero, callbackExito, callbackError) {
    console.log(`Calculando sucesión triangular para N=${numero}`);
    
    let totalAcumulado = 0;

    // Lógica de sumatoria de sumatorias
    for (let i = 1; i <= numero; i++) {
        let sumatoriaInterna = 0;
        // Calculamos la sumatoria parcial (triangular)
        for (let j = 1; j <= i; j++) {
            sumatoriaInterna += j;
        }
        totalAcumulado += sumatoriaInterna;
    }

    console.log(`>> Resultado Total Calculado: ${totalAcumulado}`);

    // Decisión lógica de qué callback ejecutar
    if (totalAcumulado < 1000) {
        callbackExito(totalAcumulado, numero);
    } else {
        callbackError(totalAcumulado, numero);
    }
}

// Callback de Éxito (< 1000)
const exitoSucesion = (resultado, n) => {
    const msg = `Las sumatorias sucesivas de ${n} es ${resultado}`;
    console.info(msg);
    document.getElementById('res-ej3').innerHTML = `<span style="color:green">${msg}</span>`;
};

// Callback de Error (>= 1000)
const errorSucesion = (resultado, n) => {
    const msg = `El número ${n} genera un total de ${resultado}, lo cual sobrepasa el objetivo (>=1000).`;
    console.warn(msg);
    document.getElementById('res-ej3').innerHTML = `<span style="color:red">${msg}</span>`;
};

function ejecutarEjercicio3() {
    const num = parseInt(document.getElementById('num-ej3').value);
    if(isNaN(num)) return alert("Ingrese un número válido");

    calcular_y_avisar_dependiendo(num, exitoSucesion, errorSucesion);
}