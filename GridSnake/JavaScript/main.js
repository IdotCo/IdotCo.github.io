import { Equation } from "./equation.js";
import { Food } from "./food.js";
import { Snake } from "./snake.js";
import { resetDirection } from "./input.js";

const startGamePage = document.querySelector('#startGamePage');
const startGameButton = document.querySelector('#startGameButton');

const countDownTimerDiv = document.querySelector('#countDownTimerDiv');
const countDownTimerText = document.querySelector('#countDownTimer');

const rightForGame = document.querySelector('#rightForGame');
const rightForStartPage = document.querySelector('#rightForStartPage');

const gameBoard = document.querySelector('#gameBoard');

export var listenForKeyPress = false;

export const GRID_SIZE = 21;

const GAME_SPEED = 8;

var snake = new Snake(3, gameBoard);

var foods = initFoods(5);

new Equation(foods);

let lastRenderTime = 0;

let gameOver = false;


//START PAGE
startGameButton.addEventListener('click', changePageFromStartPageToTimer);

function changePageFromStartPageToTimer() {
    startGamePage.style.display = 'none';
    gameBoard.style.display = 'grid';
    countDownTimerDiv.style.display = 'grid';
    timer();
}

function changePageFromTimerPageToGamePage() {
    countDownTimerDiv.style.display = 'none';
    rightForStartPage.style.display = 'none';
    rightForGame.style.display = 'grid';
    listenForKeyPress = true;
}

//TIMER
let amountOfSeconds = 3;
countDownTimerText.textContent = amountOfSeconds;
let countDown = null;
function timer() {
    countDown = setInterval(countDownTimer, 800);
}

function countDownTimer() {
    amountOfSeconds --;
    countDownTimerText.textContent = amountOfSeconds;

    if (amountOfSeconds <= 0) {
        clearInterval(countDown);
        changePageFromTimerPageToGamePage();
        
    }
}

//RESTART GAME
function restartGame() {
    gameOver = false;
    amountOfSeconds = 3;
    countDownTimerText.textContent = amountOfSeconds;
    lastRenderTime = 0;

    snake = new Snake(3, gameBoard);
    resetDirection();
    foods = initFoods(5);

    new Equation(foods);

    window.requestAnimationFrame(main);
}


//GAME PAGE - START GAME
window.requestAnimationFrame(main);

function main(currentTime) {

    if (gameOver) {
        listenForKeyPress = false;
        if (confirm('You ran out of lives\nYou Suck!!\n\n Press ok to play again')) {
            changePageFromStartPageToTimer();
            restartGame();
        }
        else{
            window.location = '../HTML'
        }
        return;
    }


    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / GAME_SPEED) return;

    lastRenderTime = currentTime;
    
    update();
    draw();
}


function update() {
    snake.move();
    foods.forEach((food) => food.checkIfEaten());
    checkGameOver();
}

function draw() {
    gameBoard.innerHTML = '';
    snake.draw();
    foods.forEach((food) => food.draw());
}

function checkGameOver() {
    gameOver = snake.checkIfDead();
}

function initFoods(numberOfFoods) {
    let foods = [];
    for (let i = 0; i < numberOfFoods; i++) {
        foods.push(new Food(gameBoard, snake, foods));
    }
    return foods;
}