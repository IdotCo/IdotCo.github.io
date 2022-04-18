import { Equation } from "./equation.js";
import { GRID_SIZE } from "./main.js";

export class Food{

    EXPANSION_RATE = 1;
    FOOD_SIZE = 2;

    foodElement = null;

    contentNumber = 0;


    constructor(gameBoard, snake, foods){

        this.foods = foods;

        this.color = this.getRandomColor();
        this.gameBoard = gameBoard;
        this.snake = snake;

        this.pos = this.getRandomPosition();
        this.x = this.pos.x;
        this.y = this.pos.y;
    }

    draw(){
        this.foodElement = document.createElement('div');
        this.foodElement.style.gridColumnStart = this.x;
        this.foodElement.style.gridColumnEnd = this.x + this.FOOD_SIZE;
        this.foodElement.style.gridRowStart = this.y;
        this.foodElement.style.gridRowEnd = this.y + this.FOOD_SIZE;
        //foodElement.style.backgroundColor = this.color;
        this.foodElement.classList.add('food');
        this.gameBoard.appendChild(this.foodElement);


        this.foodElement.textContent = this.contentNumber;
    }

    checkIfEaten(){
        for (let i = 0; i < this.FOOD_SIZE; i++) {
            for (let j = 0; j < this.FOOD_SIZE; j++) {
                if (this.snake.onSnake({ x: this.x + j, y: this.y + i })) {
                    let newPos = this.getRandomPosition();
                    this.x = newPos.x;
                    this.y = newPos.y;
                    
                    //CORRECT APPLE EATEN
                    if (this.contentNumber === Equation.correctValue) {
                        new Equation(this.foods);
                        this.snake.grow(this.EXPANSION_RATE);
                        Equation.showGoodStatusMessage();
                        return;
                    }

                    //WRONG APPLE EATEN
                    this.contentNumber = Equation.getRandomNumber(200);
                    this.snake.loseLife();
                    Equation.showBadStatusMessage();

                    return;
                }
            }
        }
    }

    getRandomPosition(){
        let newPosition;

        while (newPosition == null || this.foodOnFood(newPosition) || this.foodOnSnake(newPosition)) {
            newPosition = { x: this.randomCoord(), y: this.randomCoord() };
        }

        return newPosition;
    }

    randomCoord(){
        return Math.floor(Math.random() * (GRID_SIZE - this.FOOD_SIZE)) + 1;
    }

    foodOnFood(pos){
        //FOR EVERY FOOD
        return this.foods.some((food) => {

            //WALK THROUGH THE FOOD
            for (let i = 0; i < this.FOOD_SIZE; i++) {
                for (let j = 0; j < this.FOOD_SIZE; j++) {

                    //AND FOR EVERY POSITION IN THE FOOD, WALK THROUGH THE NEW FOOD
                    for (let k = 0; k < this.FOOD_SIZE; k++) {
                        for (let l = 0; l < this.FOOD_SIZE; l++) {   
                            if(this.snake.samePosition({ x: food.x + j, y: food.y + i }, 
                                                        {x: pos.x + l, y: pos.y + k } )){
                                return true;
                            } 
                                
                        }
                    }
                }
            }
            return false;
        });
    }

    foodOnSnake(pos){
        return this.snake.snakeBody.some(snakePart => {
            for (let i = 0; i < this.FOOD_SIZE; i++) {
                for (let j = 0; j < this.FOOD_SIZE; j++) {  
                    if(this.snake.samePosition(snakePart, {x: pos.x + j, y: pos.y + i } )){
                        return true;
                    } 
                }
            }
            return false;
        });
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        if (color == '#ff0000') {
            return '#581845';
        }
        return color;
    }
}