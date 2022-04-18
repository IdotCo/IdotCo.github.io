

export class Equation{

    static goodStatusMessageDiv = document.querySelector('#goodMessage');
    static badStatusMessageDiv = document.querySelector('#badMessage');

    static HIGHEST_EQUATION_VALUE = 100;

    value01Div = document.querySelector('#value01');
    calcMethodDiv = document.querySelector('#calcMethod');
    value02Div = document.querySelector('#value02');
    answerDiv = document.querySelector('#answer');

    
    static correctValue = 0;

    value01 = 0;
    value02 = 0;
    answer = 0;
    calcMethod = '';


    constructor(foods){

        this.foods = foods;

        this.calcMethod = Equation.getRandomNumber(3);

        switch (this.calcMethod) {
            case 0:
                this.createAdditionEquation(Equation.HIGHEST_EQUATION_VALUE);
                break;
            case 1:
                this.createSubtractionEquation(Equation.HIGHEST_EQUATION_VALUE);
                break;
            case 2:
                this.createMultiplicationEquation(10);
                break;
            case 3:
                this.createDivisionEquation(Equation.HIGHEST_EQUATION_VALUE);
                break;
            default:
                break;
        }
    }

    setFoodContent(){
        let randomNumber = Equation.getRandomNumber(this.foods.length - 1);

        this.foods.forEach((food, index) => {
            if (index === randomNumber) {   
                food.contentNumber = Equation.correctValue;
                return;
            }
            food.contentNumber = Equation.getRandomNumber(Equation.HIGHEST_EQUATION_VALUE);
        });
    }

    static showGoodStatusMessage(){
        Equation.badStatusMessageDiv.style.display = 'none';
        Equation.goodStatusMessageDiv.style.display = 'block';
        setTimeout(() => {
            Equation.goodStatusMessageDiv.style.display = 'none';
        }, 2000);
    }

    static showBadStatusMessage(){
        Equation.goodStatusMessageDiv.style.display = 'none';
        Equation.badStatusMessageDiv.style.display = 'block';
        setTimeout(() => {
            Equation.badStatusMessageDiv.style.display = 'none';
        }, 2000);
    }

    createAdditionEquation(highestValue) {
        this.value01 = Equation.getRandomNumber(highestValue);
        this.value02 = Equation.getRandomNumber(highestValue);
        this.answer = this.value01 + this.value02;
        this.calcMethod = '+';
        Equation.correctValue = this.answer;
    
        this.value01Div.textContent = this.value01;
        this.value02Div.textContent = this.value02;
        this.calcMethodDiv.textContent = this.calcMethod;

        this.setFoodContent();
    }

    createSubtractionEquation(highestValue){
        this.value01 = Equation.getRandomNumber(highestValue);
        this.value02 = Equation.getRandomNumber(this.value01);
        this.answer = this.value01 - this.value02;
        this.calcMethod = '-';
        Equation.correctValue = this.answer;
    
        this.value01Div.textContent = this.value01;
        this.value02Div.textContent = this.value02;
        this.calcMethodDiv.textContent = this.calcMethod;

        this.setFoodContent();
    }

    createMultiplicationEquation(highestValue){
        this.value01 = Equation.getRandomNumber(highestValue);
        this.value02 = Equation.getRandomNumber(highestValue);
        this.answer = this.value01 * this.value02;
        this.calcMethod = '*';
        Equation.correctValue = this.answer;
    
        this.value01Div.textContent = this.value01;
        this.value02Div.textContent = this.value02;
        this.calcMethodDiv.textContent = this.calcMethod;

        this.setFoodContent();
    }

    createDivisionEquation(highestValue){
        highestValue = highestValue - 1;

        do {
            this.value01 = Equation.getRandomNumber(highestValue) + 1;
            this.value02 = Equation.getRandomNumber(this.value01) + 1;
        } while (this.value01 % this.value02 !== 0);

        this.answer = this.value01 / this.value02;

        this.calcMethod = '/';
        Equation.correctValue = this.answer;
    
        this.value01Div.textContent = this.value01;
        this.value02Div.textContent = this.value02;
        this.calcMethodDiv.textContent = this.calcMethod;

        this.setFoodContent();
    }

    static getRandomNumber(endValue) {
        let newEndValue = endValue + 1;
        return Math.floor(Math.random() * newEndValue);
    }
}