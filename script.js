// JavaScript
// Obtener referencia al botón y al contenido adicional
const leerMasBtn = document.getElementById('leerMasBtn');
const contenidoAdicional = document.getElementById('contenidoAdicional');

// Agregar evento de clic al botón
leerMasBtn.addEventListener('click', function() {
  // Verificar el estado actual del contenido adicional
  if (contenidoAdicional.style.display === 'none') {
    // Si está oculto, mostrarlo
    contenidoAdicional.style.display = 'block';
    leerMasBtn.textContent = 'Leer menos';
  } else {
    // Si está visible, ocultarlo
    contenidoAdicional.style.display = 'none';
    leerMasBtn.textContent = 'Leer más';
  }
});

