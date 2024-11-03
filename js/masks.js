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

  // Referencias para el modal de victoria
  const victoryModal = document.getElementById('victoryModal');
  const closeVictoryModal = document.getElementById('closeVictoryModal');

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

        // Verificar si el juego ha terminado
        if (memoryGame.checkIfFinished()) {
          setTimeout(() => {
            victoryModal.style.display = 'flex'; // Muestra el modal
            localStorage.setItem('key2Unlocked', 'true'); // Guarda el estado de desbloqueo de la llave 2
          }, 500);
        }
      }
    });
  });

  // Cerrar el modal cuando el usuario haga clic en la "x" o fuera del contenido
  closeVictoryModal.addEventListener('click', () => {
    victoryModal.style.display = 'none';
    window.location.href = 'clues.html'; // Redirige a la página deseada
  });

  window.addEventListener('click', (event) => {
    if (event.target == victoryModal) {
      victoryModal.style.display = 'none';
      window.location.href = 'clues.html'; // Redirige a la página deseada
    }
  });
});

