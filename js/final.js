document.addEventListener('DOMContentLoaded', () => {
    // Configura el botón para verificar la solución
    const verifyButton = document.getElementById('verifyButton');
    const resultMessage = document.getElementById('resultMessage');
    
    verifyButton.addEventListener('click', () => {
        alert('Botón de verificar presionado');
  // El resto del código sigue igual...
      // Obtener la respuesta ingresada por el usuario
      const userAnswer = document.getElementById('answer').value;

      // Verifica si la respuesta es correcta
      if (userAnswer === '7324') {
        resultMessage.textContent = '¡Juego terminado! Has descifrado el código correctamente.';
        resultMessage.style.color = 'green';
        verifyButton.disabled = true; // Deshabilitar el botón de verificar después de la respuesta correcta
      } else {
        resultMessage.textContent = 'Respuesta incorrecta. Inténtalo de nuevo.';
        resultMessage.style.color = 'red';
      }
    });

    // Restablece el estado de las llaves en localStorage
    localStorage.setItem('key1Unlocked', 'false');
    localStorage.setItem('key2Unlocked', 'false');
  });