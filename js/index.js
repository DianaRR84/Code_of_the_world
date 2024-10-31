document.addEventListener('DOMContentLoaded', () => {
  const mapBox = document.getElementById('mapBox');

  // Redirigir al usuario al hacer clic en el primer botón
  mapBox.addEventListener('click', () => {
    window.location.href = "map.html";
  });

  const cluesBox = document.getElementById('cluesBox');

  // Redirigir al usuario al hacer clic en el primer botón
  cluesBox.addEventListener('click', () => {
    window.location.href = "clues.html";
  });

  const finalBox = document.getElementById('finalBox');

  // Redirigir al usuario al hacer clic en el primer botón
  finalBox.addEventListener('click', () => {
    window.location.href = "final.html";
  });
});

// Seleccionar el canvas
const canvas = document.getElementById('map');
const ctx = canvas.getContext('2d');

// Cargar la imagen del mapa de Londres desde una carpeta local
const mapaImg = new Image();
mapaImg.src = './img/map.jpg'; // Ruta local de la imagen

// Dibujar el mapa cuando la imagen haya cargado
mapaImg.onload = function() {
    ctx.drawImage(mapaImg, 0, 0, canvas.width, canvas.height); // Dibujar la imagen en el canvas

    // Dibujar los rectángulos sobre las ubicaciones de los iconos (para depuración)
    // ubicaciones.forEach(ubicacion => {
       // ctx.beginPath();
       // ctx.rect(ubicacion.x, ubicacion.y, ubicacion.width, ubicacion.height);
       // ctx.strokeStyle = 'red';  // Rectángulo rojo temporal
       // ctx.stroke();
    // });
};
