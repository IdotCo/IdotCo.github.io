import { listenForKeyPress } from "./main.js";

let currentDirection = {x: 0, y: 0};
let lastDirection = {x: 0, y: 0};

export function getDirection(){
    lastDirection = currentDirection;
    return currentDirection;
}

export function resetDirection(){
    currentDirection = {x: 0, y: 0};
    lastDirection = {x: 0, y: 0};
}

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event){
    if (listenForKeyPress) {
        switch (event.key) {
            case 'ArrowUp':
                if (lastDirection.y !== 0) break;
                currentDirection = { x: 0, y: -1 };
                break;
    
            case 'ArrowRight':
                if (lastDirection.x !== 0) break;
                currentDirection = { x: 1, y: 0 };
                break;
    
            case 'ArrowDown':
                if (lastDirection.y !== 0 || (currentDirection.y === 0 && currentDirection.x === 0)) break;
                currentDirection = { x: 0, y: 1 };
                break;
    
            case 'ArrowLeft':
                if (lastDirection.x !== 0) break;
                currentDirection = { x: -1, y: 0 };
                break;
    
            default:
                break;
        }
    }
}