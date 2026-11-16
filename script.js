// 1. Función Fábrica (Closure) según la especificación
function crearControladorIntentos(maximoIntentos, accionNombre) {
  // Variable privada en el entorno léxico del closure
  let contador = 0;

  // Retorna la función que mantiene acceso a 'contador', 'maximoIntentos' y 'accionNombre'
  return function (reiniciar = false) {
    // Reto adicional: si se envía true, reinicia el contador a 0
    if (reiniciar === true) {
      contador = 0;
      return "Contador reiniciado";
    }

    // Incrementar contador privado
    contador++;

    // Evaluar límite de intentos
    if (contador <= maximoIntentos) {
      return `Ejecutando ${accionNombre} - Intento ${contador} de ${maximoIntentos}`;
    } else {
      return `Bloqueado: Se superó el límite de ${maximoIntentos} intentos para ${accionNombre}`;
    }
  };
}

// 2. Variable global para almacenar la función closure activa
let ejecutarPeticion = null;

// Referencias a los elementos del DOM
const inputAccion = document.getElementById("accion");
const inputMaxIntentos = document.getElementById("maxIntentos");
const btnCrear = document.getElementById("btnCrear");
const btnEjecutar = document.getElementById("btnEjecutar");
const btnReiniciar = document.getElementById("btnReiniciar");
const divResultado = document.getElementById("resultado");
const ulHistorial = document.getElementById("historial");

// Función auxiliar para registrar resultados en pantalla
function registrarResultado(mensaje) {
  divResultado.textContent = mensaje;

  // Agregar al historial de intentos
  const li = document.createElement("li");
  li.textContent = `[${new Date().toLocaleTimeString()}] ${mensaje}`;
  ulHistorial.prepend(li);
}

// Evento: Crear/Inicializar nueva instancia del closure
btnCrear.addEventListener("click", () => {
  const accion = inputAccion.value.trim() || "Acción";
  const maxIntentos = parseInt(inputMaxIntentos.value, 10) || 3;

  // Creamos la instancia retenida en la variable 'ejecutarPeticion'
  ejecutarPeticion = crearControladorIntentos(maxIntentos, accion);

  // Habilitar los botones de acción
  btnEjecutar.disabled = false;
  btnReiniciar.disabled = false;

  ulHistorial.innerHTML = "";
  registrarResultado(`Controlador creado para "${accion}" con límite de ${maxIntentos} intentos.`);
});

// Evento: Ejecutar Petición (invoca el closure sin argumentos)
btnEjecutar.addEventListener("click", () => {
  if (ejecutarPeticion) {
    const respuesta = ejecutarPeticion(); // reiniciar = false por defecto
    registrarResultado(respuesta);
  }
});

// Evento: Reiniciar Contador (invoca el closure pasándole true)
btnReiniciar.addEventListener("click", () => {
  if (ejecutarPeticion) {
    const respuesta = ejecutarPeticion(true); // se pasa true
    registrarResultado(respuesta);
  }
});