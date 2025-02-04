import { Level, levels } from "./Level.js"
import { Snake } from "./Snake.js"
import { Food } from "./Food.js";
const FOOD_FOR_NEXT_LEVEL = 10;

class Game {
    static highScore = 0;
    constructor(){
        this.levelLoop = 0;
        this.score = 0;
        this.levels = levels;
        this.currentLevel = levels[0];
        this.snake = new Snake([0, 0], 2);
        this.counterForNextLv = 0;
    }

    get gameSpeed(){
        return 1 + (0.5 * this.levelLoop);
    }

    get startingSnakeLength(){
        return 2 + (this.levels.indexOf(this.currentLevel) * 2) + (5 * this.levelLoop)
    }

    static get FOOD_FOR_NEXT_LEVEL(){
        return FOOD_FOR_NEXT_LEVEL;
    }

    spawnSnake(){
        this.snake = new Snake([this.currentLevel.startPos[0], this.currentLevel.startPos[1]], this.startingSnakeLength)
    }

    spawnFood(){
        this.food = null;
        while (!this.food){
            const possibleX = getRandomInt(this.currentLevel.LEVEL_SIZE[0])
            const possibleY = getRandomInt(this.currentLevel.LEVEL_SIZE[1])
            let isColliding = false;
            const testFood = new Food([possibleX, possibleY])
            let i = 0;
            if(testFood.isColliding(this.snake)){
                isColliding = true;
            }
            while (!isColliding && i < this.currentLevel.walls.length) {
                if(testFood.isColliding(this.currentLevel.walls[i])){
                    isColliding = true;
                }
                i++;
            }
            i = 0;
            while (!isColliding && i < this.snake.segments.length) {
                if(testFood.isColliding(this.snake.segments[i])){
                    isColliding = true;
                }
                i++;
            }
            if (!isColliding){
                this.food = testFood;
            }
        }
    }

    isPlayerDead(){
        let result = false;
        let i = 0;
        
        if(this.snake.pos[0] < 1 ||
            this.snake.pos[0] > this.currentLevel.LEVEL_SIZE[0] ||
            this.snake.pos[1] < 1 ||
            this.snake.pos[1] > this.currentLevel.LEVEL_SIZE[1]
        ) {
            result = true;
            console.log("OOB")
        }

        while(!result && i < this.currentLevel.walls.length) {
            if(this.snake.isColliding(this.currentLevel.walls[i])){
                result = true;
                console.log("hit wall")
            }
            i ++
        }
        i = 0
        while(!result && i < this.snake.segments.length) {
            if(this.snake.isColliding(this.snake.segments[i])){
                result = true;
                console.log("hit self: " + this.snake.pos + " on: " + this.snake.segments[i].pos)
            }
            i ++
        }
        return result;
    }
}

//Return a random number >= 1 and <= _max
function getRandomInt(_max){
    return (Math.floor(Math.random() * _max) + 1)
}

export { Game }