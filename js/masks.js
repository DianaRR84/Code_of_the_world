const cards = [
  { name: 'mask1', img: 'mask1.png' },
  { name: 'mask2', img: 'mask2.png' },
  { name: 'mask3', img: 'mask3.png' },
  { name: 'mask4', img: 'mask4.png' },
  { name: 'mask5', img: 'mask5.png' },
  { name: 'mask6', img: 'mask6.png' },
  { name: 'mask1', img: 'mask1.png' },
  { name: 'mask2', img: 'mask2.png' },
  { name: 'mask3', img: 'mask3.png' },
  { name: 'mask4', img: 'mask4.png' },
  { name: 'mask5', img: 'mask5.png' },
  { name: 'mask6', img: 'mask6.png' }
];

const memoryGame = new MemoryGame(cards);
memoryGame.shuffleCards();

window.addEventListener('load', () => {
  // Reproducir música de fondo
  const backgroundMusic = new Audio('sounds/waltz.mp3');
  backgroundMusic.loop = true; // Para que la música se reproduzca en bucle
  backgroundMusic.volume = 0.5; // Ajusta el volumen (0.0 a 1.0)
  
  // Función para iniciar la música
  function playMusic() {
    backgroundMusic.play().catch(error => console.log('Autoplay bloqueado'));
  }

  // Iniciar música tras la primera interacción (clic)
  document.addEventListener('click', playMusic, { once: true });

  // Sonido específico
  const victorySound = new Audio('sounds/winning.mp3');
  
  // Agregar las cartas al HTML
  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back"></div>
        <div class="front" style="background: url('img/${pic.img}') no-repeat; background-size: cover;"></div>
      </div>
    `;
  });
  document.querySelector('#memory-board').innerHTML = html;

  // Vincular el evento de clic para cada tarjeta
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.add('turned');
      memoryGame.pickedCards.push(card);

      if (memoryGame.pickedCards.length === 2) {
        const card1 = memoryGame.pickedCards[0];
        const card2 = memoryGame.pickedCards[1];

        const card1Name = card1.getAttribute('data-card-name');
        const card2Name = card2.getAttribute('data-card-name');

        if (memoryGame.checkIfPair(card1Name, card2Name)) {
          card1.classList.add('blocked');
          card2.classList.add('blocked');
        } else {
          setTimeout(() => {
            card1.classList.remove('turned');
            card2.classList.remove('turned');
          }, 1000);
        }

        

        // Limpiar cartas seleccionadas
        memoryGame.pickedCards = [];

        // Verificar si el juego ha terminado
        if (memoryGame.checkIfFinished()) {
          backgroundMusic.pause(); // Detiene la música de fondo
          victorySound.play(); // Reproduce el sonido de victoria

          // Muestra el mensaje de juego terminado
          const endGameMessage = document.getElementById('end-game-message');
          endGameMessage.style.display = 'block';
          endGameMessage.innerHTML = '<p>Juego terminado</p>';

          localStorage.setItem('key2Unlocked', 'true');

          // Redirige después de 3 segundos
          setTimeout(() => {
            window.location.href = 'clues.html';
          }, 3000);
        }
      }
    });
  });
});

