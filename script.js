const gameBoard = document.getElementById('gameBoard');
const attemptCountElement = document.getElementById('attemptCount');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let attempts = 0;

const cardsArray = [
    '🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓',
    '🍒', '🍒', '🥑', '🥑', '🍍', '🍍', '🥝', '🥝'
];

// Shuffle the cards
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function startGame() {
    matches = 0;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    attempts = 0; 
    attemptCountElement.textContent = attempts; 
    gameBoard.innerHTML = ''; 
    shuffle(cardsArray);
    createBoard();
}

function createBoard() {
    cardsArray.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="front">${symbol}</div>
            <div class="back">?</div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        attempts++; 
        attemptCountElement.textContent = attempts; 
        checkForMatch();
    }
}

function checkForMatch() {
    lockBoard = true;
    const isMatch = firstCard.querySelector('.front').textContent === secondCard.querySelector('.front').textContent;

    if (isMatch) {
        disableCards();
        matches += 1;
        if (matches === cardsArray.length / 2) {
            setTimeout(() => alert('You found all matches!'), 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}


startGame();
