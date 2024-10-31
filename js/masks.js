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

        // Actualizar el puntaje
        document.getElementById('pairs-clicked').textContent = memoryGame.pairsClicked;
        document.getElementById('pairs-guessed').textContent = memoryGame.pairsGuessed;

        // Limpiar cartas seleccionadas
        memoryGame.pickedCards = [];

        // Verificar si el juego ha terminado
        if (memoryGame.checkIfFinished()) {
          setTimeout(() => {
            alert('¡Has conseguido completar el juego!'); // Mensaje de victoria
            localStorage.setItem('key2Unlocked', 'true'); // Guarda el estado de desbloqueo de la llave 2
            setTimeout(() => {
              window.location.href = 'clues.html'; // Redirige a index.html
            }, 2000); // Espera 2 segundos antes de redirigir
          }, 500);
        }
      }
    });
  });
});

