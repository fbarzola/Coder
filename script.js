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
  }
});

// Función para obtener el array personas del localStorage
function obtenerPersonasDelLocalStorage() {
  const personasJSON = localStorage.getItem('personas');
  return personasJSON ? JSON.parse(personasJSON) : [];
}

// Función asincrónica para obtener el JSON de personas
async function obtenerPersonasJSON() {
  try {
    // Intentamos obtener el array personas del localStorage
    let personas = obtenerPersonasDelLocalStorage();
    return JSON.stringify(personas);
  } catch (error) {
    console.error('Error al obtener el JSON de personas:', error);
    return '[]'; // Retornamos un JSON vacío en caso de error
  }
}

// Función para mostrar los usuarios en la tabla
async function mostrarUsuariosEnTabla() {
  const usersTableBody = document.getElementById('usersTableBody');
  usersTableBody.innerHTML = ''; // Limpiar la tabla antes de mostrar los usuarios

  try {
    // Obtener el JSON de personas
    const personasJSON = await obtenerPersonasJSON();
    const personas = JSON.parse(personasJSON);

    personas.forEach((persona) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${persona.nombre}</td>
        <td>${persona.apellido}</td>
        <td>${persona.dni}</td>
        <td>${persona.fechaNacimiento}</td>
        <td>${persona.nacionalidad}</td>
        <td>${persona.sexo}</td>
      `;
      usersTableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error al mostrar los usuarios en la tabla:', error);
  }
}

const paisesValidos = [
  'Argentina', 'Brasil', 'Chile', 'Colombia', 'Ecuador', 'Perú', 'Venezuela', 'EE.UU', 'Bolivia',
  'Uruguay', 'Mexico', 'Canada','Italia','España',
];

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
    Swal.fire({
      icon: 'warning',
      title: 'Error',
      text: 'Por favor, completa todos los campos.',
    });
    return;
  }

  // Validación de fecha de nacimiento
  const regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regexFecha.test(fechaNacimiento)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'La fecha de nacimiento debe tener el formato DD/MM/AAAA.',
    });
    return;
  }

  const regexDNI1 = /^\d+$/;
  const dniNumber = parseInt(dni, 10);
  if (!regexDNI1.test(dni) || dniNumber < 5000000 || dniNumber > 99999999) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El DNI debe contener solo números entre 5000000 y 99999999.',
    });
    return;
  }

  // Validación de DNI (solo números)
  const regexDNI = /^\d+$/;
  if (!regexDNI.test(dni)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El DNI debe contener solo números.',
    });
    return;
  }

 
  // Validación de nombre y apellido (más de 2 letras y puede contener 1 espacio)
const regexNombreApellido = /^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/;
if (!regexNombreApellido.test(nombre) || !regexNombreApellido.test(apellido)) {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'El nombre y el apellido deben tener más datos y pueden contener un espacio.',
  });
  return;
}

  // Validación de nombre y apellido (más de 2 letras y puede contener 1 espacio)
const regexNombreApellido1 = /^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/;
if (!regexNombreApellido1.test(nombre) || !regexNombreApellido1.test(apellido)) {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'El nombre y el apellido deben contener solo letras y pueden contener un espacio.',
  });
  return;
}

  // Validación de nacionalidad
  if (!paisesValidos.includes(nacionalidad)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Nacionalidad no válida. Por favor, ingrese un país válido.',
    });
    return;
  }

  // Crear una nueva instancia de Persona con los valores ingresados
  const persona = new Persona(dni, nombre, apellido, fechaNacimiento, nacionalidad, sexo);

  // Agregar la persona al array personas
  personas.push(persona);

  // Limpiar los campos del formulario
  event.target.reset();

  // Guardar el array personas en el localStorage
  localStorage.setItem('personas', JSON.stringify(personas));

   // Mostrar mensaje de éxito
   Swal.fire({
    icon: 'success',
    title: 'Éxito',
    text: 'Persona agregada correctamente.',

  });
});

// Agregar evento al botón "Ver Usuarios" para mostrar los usuarios en la tabla
document.getElementById('verUsuariosBtn').addEventListener('click', () => {
  mostrarUsuariosEnTabla();
});

document.getElementById('limpiarUsuariosBtn').addEventListener('click', () => {
  // Limpiar el array de usuarios
  personas = [];
  // Limpiar el contenido de la tabla
  document.getElementById('usersTableBody').innerHTML = '';
  // Guardar el array personas vacío en el localStorage
  localStorage.setItem('personas', JSON.stringify(personas));

  // Mostrar mensaje de éxito
  Swal.fire({
    icon: 'success',
    title: 'Éxito',
    text: 'Usuarios limpiados correctamente.',
  });

});




