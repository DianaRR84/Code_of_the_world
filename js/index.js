document.addEventListener('DOMContentLoaded', () => {
  const mapBox = document.getElementById('mapBox');

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
