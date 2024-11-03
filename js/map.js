// Obtener referencias a los elementos
const globe = document.getElementById("globe");
const point1 = document.getElementById("point1");
const point2 = document.getElementById("point2");
const map = document.getElementById("map");

// Calcular la posición inicial del globo para centrarlo
let posX = (map.clientWidth / 2) - (globe.clientWidth / 2);
let posY = (map.clientHeight / 2) - (globe.clientHeight / 2);

// Coloca el globo en el centro al cargar
globe.style.left = `${posX}px`;
globe.style.top = `${posY}px`;

function moveGlobe(event) {
    const step = 10; // Tamaño del paso del globo

    // Detecta qué tecla se ha presionado
    switch (event.key) {
        case "ArrowUp":
            posY -= step;
            break;
        case "ArrowDown":
            posY += step;
            break;
        case "ArrowLeft":
            posX -= step;
            break;
        case "ArrowRight":
            posX += step;
            break;
    }

    // Actualiza la posición del globo en el mapa
    globe.style.left = `${posX}px`;
    globe.style.top = `${posY}px`;

    // Verifica colisiones con los puntos
    verifyCollision();
}

function verifyCollision() {
    // Obtener posiciones de los puntos
    const point1Rect = point1.getBoundingClientRect();
    const point2Rect = point2.getBoundingClientRect();
    const globeRect = globe.getBoundingClientRect();

    // Detecta si el globo colisiona con el primer punto
    if (
        globeRect.left < point1Rect.right &&
        globeRect.right > point1Rect.left &&
        globeRect.top < point1Rect.bottom &&
        globeRect.bottom > point1Rect.top
    ) {
        window.location.href = "nazca.html"; // Redirige a nazca.html
    }

    // Detecta si el globo colisiona con el segundo punto
    if (
        globeRect.left < point2Rect.right &&
        globeRect.right > point2Rect.left &&
        globeRect.top < point2Rect.bottom &&
        globeRect.bottom > point2Rect.top
    ) {
        window.location.href = "masks.html"; // Redirige a masks.html
    }
}

// Agrega el evento de teclado para mover el globo
window.addEventListener("keydown", moveGlobe);
