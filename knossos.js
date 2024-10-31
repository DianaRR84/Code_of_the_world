// Enigma del Laberinto de Knossos
const knossosPuzzle = {
    questions: [
        { question: "Soy algo que no puedes ver, pero que siempre está contigo. Te ayudo a recordar lo que hiciste ayer. ¿Qué soy?", answer: "memoria" },
        { question: "Cuanto más quitas, más grande se vuelve. ¿Qué es?", answer: "agujero" },
        { question: "Soy ligero como una pluma, pero ni el hombre más fuerte puede sostenerme por mucho tiempo. ¿Qué soy?", answer: "aliento" },
    ],
    currentQuestion: 0,

    askQuestion() {
        if (this.currentQuestion < this.questions.length) {
            const userAnswer = prompt(this.questions[this.currentQuestion].question);
            this.checkAnswer(userAnswer);
        } else {
            this.unlockMessage();
        }
    },

    checkAnswer(answer) {
        if (answer.toLowerCase() === this.questions[this.currentQuestion].answer) {
            this.currentQuestion++;
            alert("Respuesta correcta!");
            this.askQuestion();
        } else {
            alert("Respuesta incorrecta. Intenta de nuevo.");
        }
    },

    unlockMessage() {
        alert("¡Has resuelto el laberinto! Encuentras la salida.");
        // Aquí puedes redirigir a la siguiente parte del juego
    }
};

// Comienza el enigma
knossosPuzzle.askQuestion();
