document.addEventListener('DOMContentLoaded', () => {
  // Configura el botón para verificar la solución
  const verifyButton = document.getElementById('verifyButton');
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modalMessage');
  const closeModal = document.getElementById('closeModal');
  const answerInput = document.getElementById('answer'); // Referencia al campo de entrada
  const completionScreen = document.getElementById('completionScreen'); // Referencia a la pantalla de finalización
  
  
  let gameCompleted = false; // Bandera para saber si el juego terminó
  
  verifyButton.addEventListener('click', () => {
    // Obtener la respuesta ingresada por el usuario
    const userAnswer = answerInput.value;

    // Verificar si la respuesta es correcta
    if (userAnswer === '7324') {
      modalMessage.textContent = '¡Juego terminado! Has descifrado el código correctamente.';
      modalMessage.style.color = 'green';
      verifyButton.disabled = true; // Deshabilitar el botón de verificar después de la respuesta correcta
      gameCompleted = true; // Marcar el juego como completado
    } else {
      modalMessage.textContent = 'Respuesta incorrecta. Inténtalo de nuevo.';
      modalMessage.style.color = 'red';
      answerInput.value = ''; // Borrar la respuesta del usuario si es incorrecta
    }

    // Mostrar el modal
    modal.style.display = 'block';
  });

  // Cerrar el modal cuando el usuario haga clic en la "x"
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';

    // Si el juego terminó, cerrar la ventana
    if (gameCompleted) {
      completionScreen.style.display = 'flex'; // Muestra la pantalla de finalización
    }
  });

  // Cerrar el modal cuando el usuario haga clic fuera del contenido del modal
  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';

      // Si el juego terminó, cerrar la ventana
      if (gameCompleted) {
        completionScreen.style.display = 'flex'; // Muestra la pantalla de finalización
      }
    }
  });

  // Restablece el estado de las llaves en localStorage
  localStorage.setItem('key1Unlocked', 'false');
  localStorage.setItem('key2Unlocked', 'false');
});
