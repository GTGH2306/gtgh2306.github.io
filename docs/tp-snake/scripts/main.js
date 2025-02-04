import { Entity } from "./Entity.js";
import { Food } from "./Food.js";
import { Wall } from "./Wall.js";
import { Segment } from "./Segment.js";
import { Snake } from "./Snake.js";
import { Game } from "./Game.js";
import {Level, levels} from "./Level.js"
const snakeGame = document.getElementById('snakeGame')
const scoreTxts = document.getElementsByClassName('scoreTxt')
const levelTxt = document.getElementById('levelTxt')
let keyPressed = "None";
let game = new Game();
let interval = 100/game.gameSpeed;
let gameTick;
const validInput = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
const inputBuffer = []
const highscoreTxt = document.getElementById('highscoreTxt');

newGame();


//Prevent from scrolling with keys
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

document.addEventListener("keydown", function(event){
    if (event.key == "r"){
        newGame()
        console.log(inputBuffer);
    } else if (validInput.includes(event.key)){
        if (event.key == "ArrowLeft"){
            keyPressed = "ArrowLeft";
        } else if (event.key == "ArrowUp"){
            keyPressed = "ArrowUp";
        } else if (event.key == "ArrowRight"){
            keyPressed = "ArrowRight";
        } else if (event.key == "ArrowDown"){
            keyPressed = "ArrowDown";
        }
    
        if (!inputBuffer.includes(keyPressed)){
            inputBuffer.push(keyPressed);
        }
    
        if(!gameTick && validInput.includes(keyPressed) && event.key !== 'r')
        gameTick = setInterval(() => {
            moveSnake(inputBuffer.shift())
            if(!game.isPlayerDead()){
                displaySnake(game);
                foodCheck()
                nextLevelCheck()
            } else {
                const snake = document.getElementsByClassName('snake');
                for(const _snakeElement of snake){
                    _snakeElement.classList.add('deadSnake')
                }
                document.getElementById('gameOverScreen').classList.remove('dontShow')
                clearInterval(gameTick)
            }
        
        }, interval);
    }
})


function newGame(){
    game = new Game();
    if (localStorage.getItem("highScore")) {
        Game.highScore = localStorage.getItem("highScore");
        highscoreTxt.innerText = Game.highScore;
    }
    while (inputBuffer.length > 0){
        inputBuffer.shift();
    }
    keyPressed = "";
    game.spawnSnake();
    game.spawnFood();
    displayWalls();
    displayFood();
    displaySnake();
    levelTxt.innerText = game.levels.indexOf(game.currentLevel) + (game.levelLoop * 5) + 1;
    for (const element of scoreTxts){
        element.innerText = game.score;
    }
    interval = 100/game.gameSpeed;
    clearInterval(gameTick);
    gameTick = null;
    document.getElementById('gameOverScreen').classList.add('dontShow')
}

function displayWalls(){
    for(const _wall of document.querySelectorAll('.wall')){
        _wall.remove();
    }
    for(const _wall of game.currentLevel.walls){
        const newWall = document.createElement('div');
        newWall.setAttribute('style', (
            'grid-column: ' + (_wall.pos[0]) + ' /span ' + _wall.width + '; ' +
            'grid-row: ' + (_wall.pos[1]) + ' /span ' + _wall.height + '; '
        ))
        newWall.classList.add('wall')
        snakeGame.appendChild(newWall);
    }
}

function displayFood(){
    const food = document.getElementById('food');
    if(food){
        food.remove();
    }
    const foodElement = document.createElement('div');
    foodElement.setAttribute('style', (
        'grid-column: ' + (game.food.pos[0]) + '; ' +
        'grid-row: ' + (game.food.pos[1])
    ))
    foodElement.id = 'food'
    snakeGame.appendChild(foodElement);
}

function displaySnake(){
    for(const _snakePart of document.querySelectorAll('.snake')){
        _snakePart.remove();
    }
    const snakeHead = document.createElement('div');
    snakeHead.setAttribute('style', (
        'grid-column: ' + (game.snake.pos[0]) + '; ' +
        'grid-row: ' + (game.snake.pos[1])
    ));
    snakeHead.classList.add('snake');
    snakeGame.appendChild(snakeHead);
    for(const _segment of game.snake.segments){
        const newSegment = document.createElement('div');
        newSegment.setAttribute('style', (
            'grid-column: ' + (_segment.pos[0]) + '; ' +
            'grid-row: ' + (_segment.pos[1])
        ));
        newSegment.classList.add('snake');
        snakeGame.appendChild(newSegment);
    }
}

function moveSnake(_keyPressed){
    switch (_keyPressed) {
        case "ArrowLeft":
            game.snake.go(Snake.DIRECTION.LEFT);
            break;
        case "ArrowUp":
            game.snake.go(Snake.DIRECTION.UP);
            break;
        case "ArrowRight":
            game.snake.go(Snake.DIRECTION.RIGHT);
            break;
        case "ArrowDown":
            game.snake.go(Snake.DIRECTION.DOWN);
            break;
        default:
            game.snake.go(Snake.DIRECTION.NONE);
            break;
    }
}

function foodCheck(){
    if(game.snake.isColliding(game.food)){
        game.snake.addSegments(Food.FOOD_GROW + (game.levelLoop * 2))
        game.spawnFood();
        displayFood();
        game.score ++;
        for (const element of scoreTxts){
            element.innerText = game.score;
        }
        if (game.score > Game.highScore){
            highscoreTxt.innerText = game.score;
            localStorage.setItem("highScore", game.score)
        }
        game.counterForNextLv ++;
        return true;
    } else {
        return false;
    }
}

function nextLevelCheck(){
    if (game.counterForNextLv === Game.FOOD_FOR_NEXT_LEVEL) {
        game.counterForNextLv = 0;
        let currentLevelNb = game.levels.indexOf(game.currentLevel);
        if (game.levels[currentLevelNb + 1]){
            game.currentLevel = game.levels[currentLevelNb + 1]
        } else {
            game.currentLevel = game.levels[0]
            game.levelLoop ++;
        }
        levelTxt.innerText = game.levels.indexOf(game.currentLevel) + (game.levelLoop * 5) + 1;
        game.spawnSnake();
        game.spawnFood();
        displayWalls();
        displayFood();
        displaySnake();
        interval = 100/game.gameSpeed;
        clearInterval(gameTick);
        gameTick = null;
    }
}