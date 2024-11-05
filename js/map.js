document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencias a los elementos
    const globe = document.getElementById("globe");
    const point1 = document.getElementById("point1");
    const point2 = document.getElementById("point2");
    const map = document.getElementById("map");
    

    if (!globe || !point1 || !point2 || !map) {
        // console.log("Error: Uno o más elementos no se encontraron en el DOM");
        return; // Salir si faltan elementos
    }

    // Reproducir música de fondo
    const backgroundMusic = new Audio('sounds/adventure.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;

    // Función para iniciar la música una vez
    function playMusic() {
        backgroundMusic.play().then(() => {
            // console.log("Música de fondo reproducida");
        }).catch(error => {
            // console.log("Autoplay bloqueado: " + error);
        });
    }

    // Centrar el globo en el mapa
    function centerGlobe() {
        const mapWidth = map.clientWidth;
        const mapHeight = map.clientHeight;
        const globeWidth = globe.clientWidth;
        const globeHeight = globe.clientHeight;

        let posX = (mapWidth / 2) - (globeWidth / 2);
        let posY = (mapHeight / 2) - (globeHeight / 2);

        globe.style.left = `${posX}px`;
        globe.style.top = `${posY}px`;
        // console.log("Globo centrado en:", posX, posY);
    }

    // Llama a la función para centrar el globo
    centerGlobe();

    // Evento para escuchar las teclas para iniciar la música
    document.addEventListener('keydown', (event) => {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
            playMusic();
            document.removeEventListener('keydown', arguments.callee);
        }
    });

    // Función para mover el globo
    let posX = globe.offsetLeft;
    let posY = globe.offsetTop;

    function moveGlobe(event) {
        const step = 10; // Tamaño del paso del globo

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

        globe.style.left = `${posX}px`;
        globe.style.top = `${posY}px`;
        // console.log("Nueva posición del globo:", posX, posY);

        verifyCollision();
    }

    // Función para verificar colisiones
    function verifyCollision() {
        const globeRect = globe.getBoundingClientRect();
        const point1Rect = point1.getBoundingClientRect();
        const point2Rect = point2.getBoundingClientRect();

        if (
            globeRect.left < point1Rect.right &&
            globeRect.right > point1Rect.left &&
            globeRect.top < point1Rect.bottom &&
            globeRect.bottom > point1Rect.top
        ) {
            // console.log("Colisión con punto 1");
            window.location.href = "nazca.html";
        }

        if (
            globeRect.left < point2Rect.right &&
            globeRect.right > point2Rect.left &&
            globeRect.top < point2Rect.bottom &&
            globeRect.bottom > point2Rect.top
        ) {
            // console.log("Colisión con punto 2");
            window.location.href = "masks.html";
        }
    }

    // Agrega el evento de teclado para mover el globo
    window.addEventListener("keydown", moveGlobe);
});
