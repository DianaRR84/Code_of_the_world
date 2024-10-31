// Enigma de las Máscaras de África
const africanMasks = {
    masks: [
        { mask: "Máscara 1", clue: "Soy el guardián de la sabiduría, vengo de tierras lejanas. Usado en ceremonias, mi rostro es conocido.", answer: "máscara" },
        { mask: "Máscara 2", clue: "Represento la fuerza y la valentía, mi piel es oscura y mis ojos brillantes.", answer: "león" },
        { mask: "Máscara 3", clue: "Soy símbolo de fertilidad, con adornos de colores y un gran significado en mi comunidad.", answer: "fertilidad" },
    ],
    currentMask: 0,

    askMaskClue() {
        if (this.currentMask < this.masks.length) {
            const userAnswer = prompt(this.masks[this.currentMask].clue);
            this.checkAnswer(userAnswer);
        } else {
            this.unlockMessage();
        }
    },

    checkAnswer(answer) {
        if (answer.toLowerCase() === this.masks[this.currentMask].answer) {
            alert("¡Respuesta correcta!");
            this.currentMask++;
            this.askMaskClue();
        } else {
            alert("Respuesta incorrecta. Intenta de nuevo.");
        }
    },

    unlockMessage() {
        alert("¡Has resuelto el enigma de las máscaras! Ahora conoces la importancia cultural de las máscaras africanas.");
        // Aquí puedes redirigir a la siguiente parte del juego
    }
};

// Comienza el enigma
africanMasks.askMaskClue();
