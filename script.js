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

document.getElementById('access-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe
  
    // Obtener los valores de los campos de entrada
    var dni = document.getElementById('dni').value;
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fechaNacimiento = document.getElementById('fecha-nacimiento').value;
    var nacionalidad = document.getElementById('nacionalidad').value;
    var sexo = document.getElementById('sexo').value;
  
    // Validación de campos
    if (dni === '' || nombre === '' || apellido === '' || fechaNacimiento === '' || nacionalidad === '' || sexo === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    // Validación de fecha de nacimiento
    var regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexFecha.test(fechaNacimiento)) {
      alert('La fecha de nacimiento debe tener el formato DD/MM/AAAA.');
      return;
    }
  
    // Validación de DNI (solo números)
    var regexDNI = /^\d+$/;
    if (!regexDNI.test(dni)) {
      alert('El DNI debe contener solo números.');
      return;
    }
  
  });
 
