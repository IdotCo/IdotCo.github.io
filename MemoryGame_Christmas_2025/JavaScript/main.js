// CONFIGURATION
const totalPairs = 18;
// Ensure your images are named img1.jpg, img2.jpg, etc.
const imagePath = '../Images/1024x1024_Images/'; 
const backImage = '../Images/card-back.png';

const gameBoard = document.getElementById('game-board');
const modal = document.getElementById('card-modal');
const modalImg = document.getElementById('modal-img');
const scoreDisplay = document.getElementById('score');
const winModal = document.getElementById('win-modal');
const movesDisplay = document.getElementById('moves');
const finalMovesDisplay = document.getElementById('final-moves');

let moves = 0;
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false; // Prevents clicking while animating
let tempCardIndex = null; // Stores which card was clicked to open modal

// 1. Initialize Game
function initGame() {
    cards = [];
    matchedPairs = 0;
    scoreDisplay.innerText = `Matches: 0 / ${totalPairs}`;
    gameBoard.innerHTML = '';
    
    // Create pairs
    for (let i = 1; i <= totalPairs; i++) {
        // Add two of each card
        cards.push({ id: i, img: `${imagePath}img_${i}.png` });
        cards.push({ id: i, img: `${imagePath}img_${i}.png` });
    }

    // Shuffle
    cards.sort(() => 0.5 - Math.random());

    // Generate HTML
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.dataset.id = card.id;
        
        cardElement.innerHTML = `
            <div class="card-face card-front">
                <img src="${card.img}" alt="Christmas Image">
            </div>
            <div class="card-face card-back">
                <img src="${backImage}" alt="Pattern">
            </div>
        `;

        cardElement.addEventListener('click', () => handleCardClick(index));
        gameBoard.appendChild(cardElement);
    });
}

// 2. Handle Card Click (Opens Modal)
function handleCardClick(index) {
    // If board is locked, or card is already flipped/matched, do nothing
    const cardEl = gameBoard.children[index];
    if (lockBoard || cardEl.classList.contains('flipped')) return;

    // Store index to update grid later
    tempCardIndex = index;

    // Show the modal
    const imgSrc = cards[index].img;
    modalImg.src = imgSrc;
    
    // Re-trigger animation
    const modalCard = document.querySelector('.modal-card');
    modalCard.style.animation = 'none';
    modalCard.offsetHeight; /* trigger reflow */
    modalCard.style.animation = 'zoomFlip 0.6s forwards';

    modal.classList.remove('hidden');
}

// 3. Handle Modal Click (Closes Modal & Updates Grid)
modal.addEventListener('click', () => {
    modal.classList.add('hidden');
    
    // Now flip the actual card on the board
    if (tempCardIndex !== null) {
        flipCardOnBoard(tempCardIndex);
        tempCardIndex = null;
    }
});

function flipCardOnBoard(index) {
    const cardEl = gameBoard.children[index];
    cardEl.classList.add('flipped');
    flippedCards.push(cardEl);

    // Check match if 2 cards are flipped
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// 4. Check for Match
function checkForMatch() {
    // 1. Increment Moves
    moves++;
    movesDisplay.innerText = `Moves: ${moves}`;

    lockBoard = true; 

    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.id === card2.dataset.id;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    matchedPairs++;
    scoreDisplay.innerText = `Matches: ${matchedPairs} / ${totalPairs}`;
    flippedCards = [];
    lockBoard = false;

    if (matchedPairs === totalPairs) {
        // Update the win text
        finalMovesDisplay.innerText = moves; 
        
        setTimeout(() => {
            winModal.classList.remove('hidden');
        }, 500);
    }
}

function unflipCards() {
    setTimeout(() => {
        flippedCards[0].classList.remove('flipped');
        flippedCards[1].classList.remove('flipped');
        flippedCards = [];
        lockBoard = false;
    }, 1000); // Wait 1 second before flipping back
}

function restartGame() {
    // Hide the win modal
    winModal.classList.add('hidden');
    
    // Reset variables
    flippedCards = [];
    lockBoard = false;
    
    // Reset Moves
    moves = 0;
    movesDisplay.innerText = `Moves: 0`;
    
    // Start fresh
    initGame();
}

// Start on load
initGame();