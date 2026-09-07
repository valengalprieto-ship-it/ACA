/**
 * FERRETERÍA EL TORNILLO - LÓGICA DE VALIDACIÓN DEL FORMULARIO DE CONTACTO
 * 
 * Reglas de Validación:
 * 1. Ambos mensajes (error y éxito) inician OCULTOS cuando la página se carga.
 * 2. Si el nombre está vacío o tiene menos de 2 caracteres (0 o 1 carácteres):
 *    - No se envía el formulario.
 *    - Se muestra ÚNICAMENTE el mensaje de error.
 *    - El mensaje de éxito se mantiene oculto.
 * 3. Si el nombre tiene 2 o más caracteres válidos:
 *    - El mensaje de error desaparece/se oculta.
 *    - Se muestra ÚNICAMENTE el mensaje de éxito.
 *    - No se envía a ningún servidor.
 * 4. Los mensajes de error y éxito JAMÁS aparecen simultáneamente.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Referencias a elementos del DOM
  const formulario = document.getElementById('formulario-contacto');
  const inputNombre = document.getElementById('nombre');
  const inputMensaje = document.getElementById('mensaje');
  const mensajeError = document.getElementById('mensaje-error');
  const mensajeExito = document.getElementById('mensaje-exito');

  // Asegurar que ambos mensajes comiencen estrictamente ocultos al cargar la página
  function ocultarMensajes() {
    if (mensajeError) {
      mensajeError.classList.add('hidden');
    }
    if (mensajeExito) {
      mensajeExito.classList.add('hidden');
    }
  }

  // Ejecutar ocultación inicial explícita
  ocultarMensajes();

  // Escuchar el evento de envío del formulario
  formulario.addEventListener('submit', (event) => {
    // Prevenir el envío tradicional del formulario o recarga de la página
    event.preventDefault();

    // Obtener y limpiar el valor introducido en el campo Nombre
    const valorNombre = inputNombre.value.trim();

    // Evaluar la regla de validación (Mínimo 2 caracteres)
    if (valorNombre.length < 2) {
      // CASO INVÁLIDO: Nombre vacío (0 caracteres) o de solo 1 carácter
      // 1. Mostrar únicamente el mensaje de error
      mensajeError.classList.remove('hidden');

      // 2. Ocultar estrictamente el mensaje de éxito
      mensajeExito.classList.add('hidden');

      // 3. Enfocar el campo para corregir
      inputNombre.focus();
    } else {
      // CASO VÁLIDO: Nombre con 2 o más caracteres
      // 1. Ocultar estrictamente el mensaje de error
      mensajeError.classList.add('hidden');

      // 2. Mostrar únicamente el mensaje de éxito
      mensajeExito.classList.remove('hidden');

      // 3. Limpiar los campos del formulario tras la consulta exitosa
      inputNombre.value = '';
      if (inputMensaje) {
        inputMensaje.value = '';
      }
    }
  });

  // Ocultar mensaje de error mientras el usuario vuelve a escribir
  inputNombre.addEventListener('input', () => {
    if (inputNombre.value.trim().length >= 2) {
      mensajeError.classList.add('hidden');
    }
  });
});
