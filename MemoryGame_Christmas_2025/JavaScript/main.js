document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const christmasTree = document.getElementById('christmas-tree');
    const lightsContainer = document.getElementById('lights-container');
    const starLight = document.getElementById('star-light');
    const messageOverlay = document.getElementById('message-overlay');
    const christmasMessage = document.getElementById('christmas-message');

    // --- Game Configuration ---
    // Replace with your personalized images. Make sure you have pairs for each image.
    // Example: ['image1.jpg', 'image1.jpg', 'image2.jpg', 'image2.jpg']
    const cardImages = [
        'img/mom1.jpg', 'img/mom1.jpg',
        'img/mom2.jpg', 'img/mom2.jpg',
        'img/mom3.jpg', 'img/mom3.jpg',
        'img/mom4.jpg', 'img/mom4.jpg',
        'img/mom5.jpg', 'img/mom5.jpg',
        'img/mom6.jpg', 'img/mom6.jpg',
        'img/mom7.jpg', 'img/mom7.jpg',
        'img/mom8.jpg', 'img/mom8.jpg',
        // Add more pairs as needed. Ensure an even number of cards.
    ];

    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let lockBoard = false; // To prevent clicking multiple cards too fast

    const totalPairs = cardImages.length / 2;
    const maxLights = 12; // Number of lights on the tree, adjust based on your tree image and design
    let currentLightsLit = 0;

    // --- Utility Functions ---
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // --- Christmas Tree Lights ---
    function createLights() {
        lightsContainer.innerHTML = ''; // Clear existing lights
        const treeRect = christmasTree.getBoundingClientRect();
        const treeWidth = treeRect.width;
        const treeHeight = treeRect.height;

        // Positioning for lights (these are examples, you'll need to adjust for your tree)
        const lightPositions = [
            { top: '30%', left: '20%' },
            { top: '40%', left: '70%' },
            { top: '55%', left: '30%' },
            { top: '65%', left: '80%' },
            { top: '75%', left: '40%' },
            { top: '85%', left: '15%' },
            { top: '50%', left: '50%' },
            { top: '35%', left: '60%' },
            { top: '70%', left: '25%' },
            { top: '80%', left: '65%' },
        ];

        for (let i = 0; i < maxLights; i++) {
            const light = document.createElement('div');
            light.classList.add('light');
            // Apply a position from our predefined list
            if (lightPositions[i]) {
                light.style.top = lightPositions[i].top;
                light.style.left = lightPositions[i].left;
            } else {
                // Fallback for more lights than defined positions
                light.style.top = `${20 + Math.random() * 70}%`;
                light.style.left = `${10 + Math.random() * 80}%`;
            }
            lightsContainer.appendChild(light);
        }
        updateTreeLights();
    }

    function updateTreeLights() {
        const lights = document.querySelectorAll('#lights-container .light');
        const lightsToTurnOn = Math.floor((matchedPairs / totalPairs) * maxLights);

        lights.forEach((light, index) => {
            if (index < lightsToTurnOn) {
                light.classList.add('lit');
            } else {
                light.classList.remove('lit');
            }
        });

        if (matchedPairs === totalPairs) {
            starLight.classList.add('lit');
            endGameAnimation();
        }
    }

    // --- Game Board Functions ---
    function createBoard() {
        shuffle(cardImages);
        gameBoard.innerHTML = ''; // Clear existing cards

        cardImages.forEach((imagePath, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.name = imagePath; // Store image path for matching
            card.dataset.id = index; // Unique ID for each card

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <img src="${imagePath}" alt="Card Image">
                    </div>
                    <div class="card-back">
                    </div>
                </div>
            `;

            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
            cards.push(card);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === flippedCards[0]) return; // Prevent double-clicking the same card

        this.classList.add('flip');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            lockBoard = true;
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const isMatch = card1.dataset.name === card2.dataset.name;

        if (isMatch) {
            disableCards();
            matchedPairs++;
            updateTreeLights();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        const [card1, card2] = flippedCards;
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            flippedCards.forEach(card => card.classList.remove('flip'));
            resetBoard();
        }, 1000); // Cards stay flipped for 1 second before unflipping
    }

    function resetBoard() {
        [flippedCards, lockBoard] = [[], false];
    }

    // --- End Game Animation ---
    function endGameAnimation() {
        // Hide game board
        gameBoard.classList.add('hidden');

        // Grow Christmas tree
        christmasTree.style.width = '90%';
        christmasTree.style.height = '90vh';
        christmasTree.style.position = 'absolute';
        christmasTree.style.top = '50%';
        christmasTree.style.left = '50%';
        christmasTree.style.transform = 'translate(-50%, -50%)';
        christmasTree.style.zIndex = '50'; // Bring to front

        // Make tree image grow with container
        document.getElementById('tree-image').style.width = '100%';
        document.getElementById('tree-image').style.height = '100%';

        // Delay for tree growth animation
        setTimeout(() => {
            christmasMessage.textContent = "Merry Christmas, Mom!"; // Personalize message
            messageOverlay.classList.add('show');
        }, 2500); // After tree grows
    }


    // --- Initialization ---
    function initGame() {
        createBoard();
        createLights(); // Initialize lights (all off)
        updateTreeLights(); // Ensure initial state is correct
    }

    initGame();
});