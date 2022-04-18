import { GRID_SIZE } from "./main.js";
import { getDirection, resetDirection } from "./input.js";


export class Snake{

    livesDiv = document.querySelector('#livesMessage');
    scoreDiv = document.querySelector('#scoreMessage');
    highScoreDiv = document.querySelector('#highscoreMessage');

    snakeBody = [];

    score = 0;

    constructor(length, gameBoard){

        this.gameBoard = gameBoard;
        this.lives = length;

        // this.deleteCookie('highScore');
        // this.setCookie('highScore', 0);

        this.highScore = this.getCookie('highScore');

        for (let i = 0; i < length; i++) {
            this.snakeBody.push({ x: this.getMiddle(), y: this.getMiddle() + i });
        }

    }

    grow(EXPANSION_RATE){
        let lastIndex = this.snakeBody.length - 1;
        for (let i = 0; i < EXPANSION_RATE; i++) {
            this.snakeBody.push({ ...this.snakeBody[lastIndex] });
            this.lives ++;
            this.score ++;
            if (this.score > this.highScore) {
                this.highScore = this.score;
                this.setCookie('highScore', this.highScore);
            }
        }
    }

    onSnake(pos, { ignoreHead = false } = {}){
        return this.snakeBody.some((snakePart, index) => {
            if (ignoreHead && index === 0) return false;
            return this.samePosition(snakePart, pos);
        });
    }

    samePosition(pos1, pos2){
        return pos1.x === pos2.x && pos1.y === pos2.y;
    }

    move(){

        const  direction = getDirection();

        if (!(direction.x === 0 && direction.y === 0)) {   
            for (let i = this.snakeBody.length - 2; i >= 0; i--) {
                this.snakeBody[i + 1] = { ...this.snakeBody[i] };
            }
        }

        this.snakeBody[0].x += direction.x;
        this.snakeBody[0].y += direction.y;

        this.checkLoseLifeCondition();

    }

    checkBorderCollision(){
        let pos = this.snakeBody[0];
        return (
            pos.x < 1 || pos.x > GRID_SIZE ||
            pos.y < 1 || pos.y > GRID_SIZE
        )   
    }

    checkSnakeCollision(){
        return this.onSnake({ x: this.snakeBody[0].x, y: this.snakeBody[0].y }, {ignoreHead: true });
    }

    checkLoseLifeCondition(){
        if (this.checkBorderCollision() || this.checkSnakeCollision()){
            resetDirection();

            if (this.snakeBody.length > 3) {
                let length = this.snakeBody.length;
                for (let i = 3; i < length; i++) {
                    this.loseLife();
                }
            }
            else{
                this.loseLife();
            }

            if (this.snakeBody.length > 0) {   
                for (let i = 0; i < this.snakeBody.length; i++) {
                    this.snakeBody[i] = { ...{x: this.getMiddle(), y: this.getMiddle() + i } };
                }
            }
        }
    }

    checkIfDead(){
        return this.lives === 0;
    }

    loseLife(){
        this.snakeBody.pop();
        this.lives --;
    }

    getMiddle(){
        return Math.ceil(GRID_SIZE / 2);
    }

    draw(){
        this.updateLivesAndScoreDiv();
        if (this.snakeBody.length > 1) {
            this.drawHead();
            this.drawTail();
        } else if (this.snakeBody.length === 1) {
            this.drawHead();
        }
    }

    drawHead(){
        this.drawSnakePart(this.snakeBody[0].x, this.snakeBody[0].y, 'snakeHead');
    }

    drawTail(){
        for (let i = 1; i < this.snakeBody.length; i++) {
            this.drawSnakePart(this.snakeBody[i].x, this.snakeBody[i].y, 'snakePart');
        }
    }

    drawSnakePart(x, y, bodyType){
        const snakePart = document.createElement('div');
        snakePart.style.gridColumnStart = x;
        snakePart.style.gridRowStart = y;
        snakePart.classList.add(bodyType);
        this.gameBoard.appendChild(snakePart);
    }

    updateLivesAndScoreDiv(){
        this.livesDiv.textContent = 'Lives: ' + this.lives;
        this.scoreDiv.textContent = 'Score: ' + this.score;

        if (this.highScore > 0) {
            this.highScoreDiv.textContent = 'HighScore: ' + this.highScore;
        }
    }

    getCookie(name){
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split('; ');
        let result = null;

        cookieArray.forEach((element) => {
            if (element.indexOf(name) == 0) {
                result = element.substring(name.length + 1);
            }
        });
        return result;
    }

    setCookie(name, value){
        document.cookie = `${name}=${value};`
    }

    deleteCookie(name){
        document.cookie = name + '=null; expires=' + null + ';';
    }

}