const globe = document.getElementById('globe');
let globeX = 100; // Posición inicial en X
let globeY = 100; // Posición inicial en Y

// Definimos las ubicaciones de destino (coordenadas aproximadas de Perú y Venecia)
const locations = [
    { name: 'Perú', x: 450, y: 430, width: 50, height: 50, target: 'nazca.html' }, // Coordenadas para Perú
    { name: 'Venecia', x: 250, y: 775, width: 50, height: 50, target: 'masks.html' } // Coordenadas para Venecia
];

const globeWidth = 50; // Ancho del globo
const globeHeight = 50; // Alto del globo

// Asignar las coordenadas iniciales al estilo del globo
globe.style.left = `${globeX}px`;
globe.style.top = `${globeY}px`;

// Cargar el sonido (agrega la ruta de tu archivo de sonido)
const foundSound = new Audio('sounds/audio1.mp3');

document.addEventListener('keydown', (event) => {
    const step = 5; // Paso del globo

    // Guardamos las posiciones anteriores para permitir revertir si es necesario
    const previousX = globeX;
    const previousY = globeY;

    switch (event.key) {
        case 'ArrowUp':
            globeY -= step;
            break;
        case 'ArrowDown':
            globeY += step;
            break;
        case 'ArrowLeft':
            globeX -= step;
            break;
        case 'ArrowRight':
            globeX += step;
            break;
    }

    // Restringir el movimiento del globo dentro de los límites de la pantalla
    // Obtenemos el ancho y alto de la ventana
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Limitar la posición X
    if (globeX < 0) {
        globeX = 0; // No permitir que se salga por la izquierda
    } else if (globeX > windowWidth - globeWidth) {
        globeX = windowWidth - globeWidth; // No permitir que se salga por la derecha
    }

    // Limitar la posición Y
    if (globeY < 0) {
        globeY = 0; // No permitir que se salga por arriba
    } else if (globeY > windowHeight - globeHeight) {
        globeY = windowHeight - globeHeight; // No permitir que se salga por abajo
    }

    // Actualizar la posición del globo en el mapa
    globe.style.left = `${globeX}px`;
    globe.style.top = `${globeY}px`;

    // Comprobar si el globo ha llegado a alguna de las ubicaciones
    locations.forEach(location => {
        if (
            globeX >= location.x &&
            globeX <= location.x + location.width &&
            globeY >= location.y &&
            globeY <= location.y + location.height
        ) {

            // Reproducir el sonido al encontrar la ubicación
            foundSound.play();

            // Cambiar la imagen del globo por una lupa
            //globe.src = 'img/lens.png';

            // Mostrar un mensaje y redirigir
            setTimeout(() => {
                window.location.href = location.target; // Redirigir a la página correspondiente
            }, 1000); // Esperar medio segundo antes de redirigir
        }
    });
});
