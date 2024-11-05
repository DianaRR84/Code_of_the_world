document.addEventListener('DOMContentLoaded', () => {
  const mapBox = document.getElementById('mapBox');

  // Reproducir música de fondo
  const backgroundMusic = new Audio('sounds/suspense.mp3');
  backgroundMusic.loop = true; // Para que la música se reproduzca en bucle
  backgroundMusic.volume = 0.5; // Ajusta el volumen (0.0 a 1.0)
  
  // Función para iniciar la música
  function playMusic() {
    backgroundMusic.play().catch(error => console.log('Autoplay bloqueado'));
  }

  // Iniciar música tras la primera interacción (clic)
  document.addEventListener('click', playMusic, { once: true });
  
  // Redirigir al usuario al hacer clic en el primer botón
  mapBox.addEventListener('click', () => {
    window.location.href = "map.html";
  });

  const cluesBox = document.getElementById('cluesBox');

  // Redirigir al usuario al hacer clic en el segundo botón
  cluesBox.addEventListener('click', () => {
    window.location.href = "clues.html";
  });

});

// Seleccionar el canvas
const canvas = document.getElementById('map');
const ctx = canvas.getContext('2d');

// Cargar la imagen del mapa desde una carpeta local
const mapaImg = new Image();
mapaImg.src = './img/map.jpg'; // Ruta local de la imagen

// Dibujar el mapa cuando la imagen haya cargado
mapaImg.onload = function() {
    ctx.drawImage(mapaImg, 0, 0, canvas.width, canvas.height); // Dibujar la imagen en el canvas

};
