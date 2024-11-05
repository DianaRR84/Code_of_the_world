const imageUrl = 'img/nazca.jpg';
const piecesContainer = document.getElementById('pieces');
const dropzone = document.getElementById('dropzone');
const timerElement = document.getElementById('time');
const messageElement = document.getElementById('message');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restartButton');
const rows = 3; // Número de filas de piezas
const cols = 5; // Número de columnas de piezas
let placedPieces = 0; // Contador para piezas colocadas
let timer; // Variable para el temporizador
let seconds = 60; // Contador de segundos

// Función para iniciar el temporizador de cuenta atrás
function startTimer() {
    timer = setInterval(() => {
        seconds--;
        timerElement.textContent = seconds; // Actualiza el tiempo mostrado
        if (seconds <= 0) {
            clearInterval(timer);
            stopMusic(); // Detener la música de fondo
            playSound(failSound); // Reproduce el sonido de fallo
            showMessage(false); // Muestra el mensaje de tiempo agotado
        }
    }, 1000);
}

// Reproducir música de fondo
const backgroundMusic = new Audio('sounds/peru.mp3');
backgroundMusic.loop = true; // Para que la música se reproduzca en bucle
backgroundMusic.volume = 0.1; // Ajusta el volumen (0.0 a 1.0)

// Sonidos de victoria y fallo
const victorySound = new Audio('sounds/winning.mp3');
const failSound = new Audio('sounds/losing.mp3');

// Función para iniciar la música
function playMusic() {
  backgroundMusic.play().catch(error => console.log('Autoplay bloqueado'));
}

// Función para detener la música
function stopMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }
  
  // Función para reproducir sonidos específicos (victoria o fallo)
  function playSound(sound) {
    sound.play().catch(error => console.log('Error reproduciendo el sonido'));
  }

// Iniciar música tras la primera interacción (clic)
document.addEventListener('click', playMusic, { once: true });

// Función para crear piezas del rompecabezas a partir de la imagen
function createPuzzlePieces() {
    const pieceWidth = 100; // Ancho de cada pieza
    const pieceHeight = 100; // Altura de cada pieza

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const piece = document.createElement('div');
            piece.className = 'piece';
            piece.style.backgroundImage = `url(${imageUrl})`;
            piece.style.backgroundSize = `${cols * pieceWidth}px ${rows * pieceHeight}px`;
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;
            piece.draggable = true;

            piece.dataset.row = row; // Guarda el índice de fila
            piece.dataset.col = col; // Guarda el índice de columna

            piece.addEventListener('dragstart', dragStart);
            piece.addEventListener('dragend', dragEnd);

            piecesContainer.appendChild(piece);
        }
    }

    shufflePieces();
}

// Función para mezclar las piezas en el contenedor
function shufflePieces() {
    const pieces = Array.from(piecesContainer.children);
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        piecesContainer.appendChild(pieces[j]);
    }
}

dropzone.addEventListener('dragover', dragOver);
dropzone.addEventListener('drop', drop);
dropzone.addEventListener('dragleave', dragLeave);

// Funciones de arrastrar y soltar
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.style.backgroundPosition);
    e.dataTransfer.setData('row', e.target.dataset.row); // Guardar fila
    e.dataTransfer.setData('col', e.target.dataset.col); // Guardar columna
    setTimeout(() => {
        e.target.style.display = 'none'; // Oculta la pieza que se arrastra
    }, 0);
}

function dragEnd(e) {
    e.target.style.display = 'block'; // Muestra de nuevo la pieza si no se suelta
}

function dragOver(e) {
    e.preventDefault();
    dropzone.classList.add('over');
}

function dragLeave() {
    dropzone.classList.remove('over');
}

function drop(e) {
    e.preventDefault();
    const position = e.dataTransfer.getData('text/plain');
    const row = parseInt(e.dataTransfer.getData('row'));
    const col = parseInt(e.dataTransfer.getData('col'));

    // Verificar si la posición ya está ocupada
    const existingPieces = Array.from(dropzone.children);
    const isPieceAlreadyPlaced = existingPieces.some(existingPiece => {
        const existingRow = parseInt(existingPiece.style.top) / 100;
        const existingCol = parseInt(existingPiece.style.left) / 100;
        return existingRow === row && existingCol === col;
    });

    if (!isPieceAlreadyPlaced && placedPieces < rows * cols) {
        // Crear una nueva pieza en la posición correcta en el dropzone
        const img = document.createElement('div');
        img.style.backgroundImage = `url(${imageUrl})`;
        img.style.backgroundSize = `${cols * 100}px ${rows * 100}px`; 
        img.style.backgroundPosition = position;
        img.style.width = '100px'; // Ancho de la pieza en el dropzone
        img.style.height = '100px'; // Altura de la pieza en el dropzone
        img.style.position = 'absolute';
        img.style.left = `${col * 100}px`; // Calcula posición horizontal
        img.style.top = `${row * 100}px`; // Calcula posición vertical

        dropzone.appendChild(img); // Agrega la pieza al dropzone
        placedPieces++; // Incrementa el contador de piezas colocadas

        // Verifica si se completó el rompecabezas
        if (placedPieces === rows * cols) {
            clearInterval(timer); // Detiene el temporizador
            stopMusic(); // Detener la música de fondo
            playSound(victorySound); // Reproduce el sonido de victoria
            showMessage(true); // Muestra el mensaje de rompecabezas resuelto
        }
    }

    // Oculta la pieza de la izquierda
    const pieces = Array.from(piecesContainer.children);
    const draggedPiece = pieces.find(piece => piece.style.backgroundPosition === position);
    if (draggedPiece) {
        draggedPiece.remove(); // Elimina la pieza del área de piezas
    }

    dropzone.classList.remove('over');
}

// Función para mostrar el mensaje de éxito o tiempo agotado
function showMessage(solved) {
    if (solved) {
        resultElement.textContent = `Rompecabezas resuelto en ${60 - seconds} segundos`;
        restartButton.style.display = 'none'; // Oculta el botón de reinicio
        localStorage.setItem('key1Unlocked', 'true'); // Guarda el estado de la primera llave habilitada
        setTimeout(() => {
            window.location.href = 'clues.html'; // Redirige a la pantalla de pistas después de 3 segundos
        }, 3000);
    } else {
        resultElement.textContent = `Tiempo agotado. Intenta de nuevo!`;
        restartButton.style.display = 'block'; // Muestra el botón de reinicio
    }
    messageElement.style.display = 'block';
}

// Función para reiniciar el juego
restartButton.addEventListener('click', () => {
    localStorage.removeItem('key1Unlocked'); // Borra el progreso de la llave al reiniciar
    window.location.href = 'nazca.html'; // Redirige a la página principal
});

// Inicializa el rompecabezas al cargar la página
createPuzzlePieces();
startTimer(); // Inicia el temporizador










