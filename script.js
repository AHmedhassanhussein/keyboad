const gameArea = document.getElementById('gameArea');
const typingInput = document.getElementById('typingInput');
const scoreDisplay = document.getElementById('score');
let words = [];
let score = 0;
let gameInterval;
let wordSpeed = 2;

// Sample words to appear in the game
const wordList = ['ayaanle', 'ahmed', 'hassan', 'xuseen', 'hooyo'];

function createWord() {
    const wordText = wordList[Math.floor(Math.random() * wordList.length)];
    const wordElement = document.createElement('div');
    wordElement.classList.add('word');
    wordElement.textContent = wordText;

    // Randomize the horizontal position of the word
    wordElement.style.left = Math.random() * (gameArea.offsetWidth - 100) + 'px';
    gameArea.appendChild(wordElement);

    // Store word information for later checking
    words.push({
        element: wordElement,
        text: wordText,
        y: 0,
    });
}

function moveWords() {
    words.forEach((word, index) => {
        word.y += wordSpeed;
        word.element.style.top = word.y + 'px';

        // If the word reaches the bottom of the game area
        if (word.y > gameArea.offsetHeight - 40) {
            gameOver();
        }
    });
}

function checkInput() {
    const inputText = typingInput.value.trim();
    words.forEach((word, index) => {
        if (inputText === word.text) {
            // Remove word from game area
            gameArea.removeChild(word.element);
            words.splice(index, 1);
            typingInput.value = '';

            // Update score
            score += 10;
            scoreDisplay.textContent = score;
        }
    });
}

function gameOver() {
    clearInterval(gameInterval);
    alert(`Game Over! Your score: ${score}`);
    resetGame();
}

function resetGame() {
    // Reset game state
    words.forEach(word => {
        gameArea.removeChild(word.element);
    });
    words = [];
    score = 0;
    scoreDisplay.textContent = score;
    typingInput.value = '';
    startGame();
}

function startGame() {
    gameInterval = setInterval(() => {
        createWord();
        moveWords();
    }, 1000);
}

// Event listener to check typed words
typingInput.addEventListener('input', checkInput);

// Start the game
startGame();
