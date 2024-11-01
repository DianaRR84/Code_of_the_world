// Obtener referencias a los elementos
const globo = document.getElementById("globo");
const punto1 = document.getElementById("punto1");
const punto2 = document.getElementById("punto2");
const mapa = document.getElementById("mapa");

// Calcular la posición inicial del globo para centrarlo
let posX = (mapa.clientWidth / 2) - (globo.clientWidth / 2);
let posY = (mapa.clientHeight / 2) - (globo.clientHeight / 2);

// Coloca el globo en el centro al cargar
globo.style.left = `${posX}px`;
globo.style.top = `${posY}px`;

function moverGlobo(event) {
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
    globo.style.left = `${posX}px`;
    globo.style.top = `${posY}px`;

    // Verifica colisiones con los puntos
    verificarColision();
}

function verificarColision() {
    // Obtener posiciones de los puntos
    const punto1Rect = punto1.getBoundingClientRect();
    const punto2Rect = punto2.getBoundingClientRect();
    const globoRect = globo.getBoundingClientRect();

    // Detecta si el globo colisiona con el primer punto
    if (
        globoRect.left < punto1Rect.right &&
        globoRect.right > punto1Rect.left &&
        globoRect.top < punto1Rect.bottom &&
        globoRect.bottom > punto1Rect.top
    ) {
        window.location.href = "nazca.html"; // Redirige a nazca.html
    }

    // Detecta si el globo colisiona con el segundo punto
    if (
        globoRect.left < punto2Rect.right &&
        globoRect.right > punto2Rect.left &&
        globoRect.top < punto2Rect.bottom &&
        globoRect.bottom > punto2Rect.top
    ) {
        window.location.href = "masks.html"; // Redirige a masks.html
    }
}

// Agrega el evento de teclado para mover el globo
window.addEventListener("keydown", moverGlobo);
