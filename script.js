// Definir la clase constructora de Persona
class Persona {
  constructor(dni, nombre, apellido, fechaNacimiento, nacionalidad, sexo) {
    this.dni = dni;
    this.nombre = nombre;
    this.apellido = apellido;
    this.fechaNacimiento = fechaNacimiento;
    this.nacionalidad = nacionalidad;
    this.sexo = sexo;
  }
}

// Crear un array para almacenar las personas
let personas = [];

// Recuperar los datos del localStorage al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  const personasJSON = localStorage.getItem('personas');
  if (personasJSON) {
    personas = JSON.parse(personasJSON);
    console.log('Datos recuperados del localStorage:', personas);
  }
});

document.getElementById('access-form').addEventListener('submit', (event) => {
  event.preventDefault(); // Evita que el formulario se envíe

  // Obtener los valores de los campos de entrada
  const dni = document.getElementById('dni').value;
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const fechaNacimiento = document.getElementById('fecha-nacimiento').value;
  const nacionalidad = document.getElementById('nacionalidad').value;
  const sexo = document.getElementById('sexo').value;

  // Validación de campos
  if (!dni || !nombre || !apellido || !fechaNacimiento || !nacionalidad || !sexo) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Validación de fecha de nacimiento
  const regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regexFecha.test(fechaNacimiento)) {
    alert('La fecha de nacimiento debe tener el formato DD/MM/AAAA.');
    return;
  }

  // Validación de DNI (solo números)
  const regexDNI = /^\d+$/;
  if (!regexDNI.test(dni)) {
    alert('El DNI debe contener solo números.');
    return;
  }

  // Crear una nueva instancia de Persona con los valores ingresados
  const persona = new Persona(dni, nombre, apellido, fechaNacimiento, nacionalidad, sexo);

  // Agregar la persona al array personas
  personas.push(persona);

  // Mostrar el array actualizado
  console.log(personas);

  // Limpiar los campos del formulario
  event.target.reset();

  // Recorrer el array personas
  personas.forEach((persona, index) => {
    console.log(`Persona ${index + 1}:`);
    console.log('DNI:', persona.dni);
    console.log('Nombre:', persona.nombre);
    console.log('Apellido:', persona.apellido);
    console.log('Fecha de Nacimiento:', persona.fechaNacimiento);
    console.log('Nacionalidad:', persona.nacionalidad);
    console.log('Sexo:', persona.sexo);
    console.log('-----------------------');
  });

  // Guardar el array personas en el localStorage
  localStorage.setItem('personas', JSON.stringify(personas));
});

// Método de búsqueda por DNI
function buscarPorDNI(dni) {
  const resultado = personas.filter(persona => persona.dni === dni);
  return resultado;
}

// Método de filtrado por nacionalidad
function filtrarPorNacionalidad(nacionalidad) {
  const resultado = personas.filter(persona => persona.nacionalidad === nacionalidad);
  return resultado;
}

// Método de búsqueda por nombre y apellido
function buscarPorNombreApellido(nombre, apellido) {
  const resultado = personas.filter(persona => persona.nombre === nombre && persona.apellido === apellido);
  return resultado;
}


