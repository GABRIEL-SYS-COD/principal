// ==================== 1. EFECTO MATRIX ====================

// Configuración del efecto Matrix
const MATRIX_INTERVAL = 100; // Milisegundos entre cada generación de caracteres Matrix
const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ';

// Inicialización del fondo Matrix
const matrixBg = document.createElement('div');
matrixBg.className = 'matrix-bg';
document.body.appendChild(matrixBg);

// Crea una nueva línea de caracteres Matrix
function createMatrixLine() {
  const line = document.createElement('div');
  line.className = 'matrix-line';
  line.style.left = Math.random() * 100 + '%';
  line.style.animationDuration = Math.random() * 3 + 2 + 's';

  const length = Math.floor(Math.random() * 20) + 10;
  for (let i = 0; i < length; i++) {
    const char = document.createElement('div');
    char.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    char.style.opacity = i === 0 ? '1' : '0.' + (9 - Math.min(i, 9));
    line.appendChild(char);
  }

  matrixBg.appendChild(line);
  line.addEventListener('animationend', () => line.remove());
}

setInterval(createMatrixLine, MATRIX_INTERVAL);

// ==================== 2. MODAL FORMULARIO ====================

// Abre el modal del formulario
function abrirModal() {
  document.getElementById('miModal').style.display = 'block';
}

// Cierra el modal del formulario
function cerrarModal() {
  document.getElementById('miModal').style.display = 'none';
}

// Cierra el modal al hacer clic fuera de él
window.onclick = function(event) {
  const modal = document.getElementById('miModal');
  if (event.target === modal) {
    cerrarModal();
  }
}

window.onload = abrirModal;

// ==================== 3. ENVÍO DE FORMULARIO (GOOGLE SHEETS) ====================

// Configuración de la URL de Google Sheets
const URL_GOOGLE_SHEETS = 'https://script.google.com/macros/s/AKfycbxTlmfG6g4K9m2jF0RFi6DDslLgmsgugo1uEO1CgPIg/dev';

// Manejo del formulario
const formulario = document.getElementById("formulario-contacto");
const estado = document.getElementById("estado-envio");

formulario.addEventListener("submit", function(e) {
  e.preventDefault();
  estado.textContent = 'Enviando…';

  // Preparación y envío de datos a Google Sheets
  const formData = new FormData();
  formData.append("nombre", formulario.nombre.value);
  formData.append("email", formulario.email.value);
  formData.append("mensaje", formulario.mensaje.value);

  fetch(URL_GOOGLE_SHEETS, {
    method: "POST",
    body: formData,
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
  .then(response => {
    if (response.ok || response.type === 'opaque') {
      estado.textContent = "✅ Enviado correctamente";
      formulario.reset();
      setTimeout(() => cerrarModal(), 1500);
    } else {
      throw new Error('Error en el envío: ' + response.status);
    }
  })
  .catch(err => {
    estado.textContent = "❌ Error al enviar. Por favor, inténtelo de nuevo";
    console.error('Error:', err);
  });
});
