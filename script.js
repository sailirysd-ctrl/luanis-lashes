const formulario = document.getElementById("formularioCita");
const confirmacion = document.getElementById("confirmacion");
const detallesCita = document.getElementById("detallesCita");
const botonWhatsApp = document.getElementById("botonWhatsApp");
const listaCitas = document.getElementById("listaCitas");

// Evitar reservar fechas pasadas
const campoFecha = document.getElementById("fecha");
const hoy = new Date();
const fechaHoy = [
  hoy.getFullYear(),
  String(hoy.getMonth() + 1).padStart(2, "0"),
  String(hoy.getDate()).padStart(2, "0")
].join("-");

campoFecha.min = fechaHoy;

// Guardar y mostrar citas
let citas = JSON.parse(localStorage.getItem("citasLash")) || [];

function mostrarCitas() {
  listaCitas.innerHTML = "";

  citas.forEach((cita) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-cita";

    const nombre = document.createElement("h3");
    nombre.textContent = "💗 " + cita.nombre;

    const servicio = document.createElement("p");
    servicio.textContent = "Servicio: " + cita.servicio;

    const fecha = document.createElement("p");
    fecha.textContent = "Fecha: " + cita.fecha;

    const hora = document.createElement("p");
    hora.textContent = "Hora: " + cita.hora;

    tarjeta.append(nombre, servicio, fecha, hora);
    listaCitas.appendChild(tarjeta);
  });
}

formulario.addEventListener("submit", function(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const servicio = document.getElementById("servicio").value;
  const fecha = campoFecha.value;
  const hora = document.getElementById("hora").selectedOptions[0].text;

  const nuevaCita = {
    nombre,
    telefono,
    servicio,
    fecha,
    hora
  };

  // Guardar cita
  citas.push(nuevaCita);
  localStorage.setItem("citasLash", JSON.stringify(citas));

  // Mostrar confirmación
  detallesCita.innerHTML = "";

  [
    "Clienta: " + nombre,
    "Servicio: " + servicio,
    "Fecha: " + fecha,
    "Hora: " + hora
  ].forEach((detalle) => {
    const parrafo = document.createElement("p");
    parrafo.textContent = detalle;
    detallesCita.appendChild(parrafo);
  });

  confirmacion.hidden = false;

  // Preparar mensaje de WhatsApp
  const mensaje =
    "🎀 ¡Hola! Mi cita ha sido reservada con éxito 💗\n\n" +
    "Nombre: " + nombre + "\n" +
    "Servicio: " + servicio + "\n" +
    "Fecha: " + fecha + "\n" +
    "Hora: " + hora + "\n\n" +
    "¡Gracias! 💕";

  botonWhatsApp.href =
    "https://wa.me/?text=" + encodeURIComponent(mensaje);

  // Actualizar lista
  mostrarCitas();

  // Limpiar formulario
  formulario.reset();

  confirmacion.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

mostrarCitas();
