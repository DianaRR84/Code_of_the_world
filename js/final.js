document.addEventListener('DOMContentLoaded', () => {
  // Configura el botón para verificar la solución
  const completionScreen = document.getElementById('completionScreen');
  if (completionScreen) {
    completionScreen.style.display = 'none'; // Oculta al inicio
  }
  const verifyButton = document.getElementById('verifyButton');
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modalMessage');
  const closeModal = document.getElementById('closeModal');
  const answerInput = document.getElementById('answer'); // Referencia al campo de entrada
  
  
  // Reproducir música de fondo
  // Music by https://www.fiftysounds.com
  const backgroundMusic = new Audio('sounds/final.mp3');
  backgroundMusic.loop = true; // Para que la música se reproduzca en bucle
  backgroundMusic.volume = 0.5; // Ajusta el volumen (0.0 a 1.0)

  // Función para iniciar la música
  function playMusic() {
    backgroundMusic.play().catch(error => console.log('Autoplay bloqueado'));
  }

  // Iniciar música tras la primera interacción (clic)
  document.addEventListener('click', playMusic, { once: true });
  
  let gameCompleted = false; // Bandera para saber si el juego terminó
  
  // Cargar sonidos específicos
  const victorySound = new Audio('sounds/winning.mp3');
  const failSound = new Audio('sounds/losing.mp3');

  verifyButton.addEventListener('click', () => {
    // Obtener la respuesta ingresada por el usuario
    const userAnswer = answerInput.value;

    // Detener la música de fondo
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0; // Reinicia la música de fondo

    // Verificar si la respuesta es correcta
    if (userAnswer === '7324') {
      // Mostrar mensaje de éxito
      modalMessage.textContent = '¡Juego terminado! Has descifrado el código correctamente.';
      modalMessage.style.color = 'green';
      verifyButton.disabled = true; // Deshabilitar el botón de verificar después de la respuesta correcta
      gameCompleted = true; // Marcar el juego como completado

      // Borrar la respuesta del usuario
      answerInput.value = ''; // Limpiar el campo de entrada

      // Reproducir sonido de victoria
      victorySound.play();

      // Ocultar el modal después de 3 segundos y mostrar la pantalla de finalización
      setTimeout(() => {
        modal.style.display = 'none'; // Ocultar modal
        if (gameCompleted) completionScreen.style.display = 'flex';
      }, 3000); // 3000 ms = 3 segundos
    } else {
      modalMessage.textContent = 'Respuesta incorrecta. Inténtalo de nuevo.';
      modalMessage.style.color = 'red';
      answerInput.value = ''; // Borrar la respuesta del usuario si es incorrecta
    
      // Reproducir sonido de error
      failSound.play();
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
