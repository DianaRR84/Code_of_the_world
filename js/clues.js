document.addEventListener('DOMContentLoaded', () => {
  const key1 = document.getElementById('key1');
  const key2 = document.getElementById('key2');
  const solveButton = document.getElementById('solveButton');

  
  
  // Verifica si la primera llave fue desbloqueada al completar el rompecabezas
  if (localStorage.getItem('key1Unlocked') === 'true') {
      key1.classList.remove('disabled'); // Habilita la primera llave
      key1.style.opacity = 1;
      if (!document.getElementById('note1')) {
        const note1 = document.createElement('div');
        note1.id = 'note1';
        note1.classList.add('vintage-note');
        note1.textContent = 'Pista 1: Cada letra representa su posición en el abecedario, restándole 3 al número correspondiente.';
        key1.parentNode.appendChild(note1);
      }
    }

    // Verifica si la segunda llave fue desbloqueada
    if (localStorage.getItem('key2Unlocked') === 'true') {
      key2.classList.remove('disabled'); // Habilita la primera llave
      key2.style.opacity = 1;
      if (!document.getElementById('note2')) {
        const note2 = document.createElement('div');
        note2.id = 'note1';
        note2.classList.add('vintage-note');
        note2.textContent = 'Pista 2: Intercambia el primer y último dígito, y a los números impares súmales 1.'
        key2.parentNode.appendChild(note2);
      }
    }  
  
    // Si ambas llaves están desbloqueadas, habilita el botón de resolución
    if (localStorage.getItem('key1Unlocked') === 'true' && localStorage.getItem('key2Unlocked') === 'true') {
      solveButton.classList.remove('disabled');
      solveButton.style.opacity = 1;
      solveButton.style.cursor = 'pointer';
    }

 
});




