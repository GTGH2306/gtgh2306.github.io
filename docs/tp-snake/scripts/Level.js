import { Wall } from "./Wall.js";

const LEVEL_SIZE = [34, 24]

class Level {
    constructor(_startPos){
        this.startPos = _startPos;
        this.walls = [];
    }

    addWall(_wall) {
        this.walls.push(_wall);
    }

    get LEVEL_SIZE(){
        return LEVEL_SIZE;
    }
}

const levelOne = new Level([17, 17]);
levelOne.addWall(new Wall([13, 11], 10, 2))

const levelTwo = new Level([17, 13]);
levelTwo.addWall(new Wall([9, 9],2 ,8))
levelTwo.addWall(new Wall([25, 9],2 ,8))

const levelThree = new Level([17, 13]);
levelThree.addWall(new Wall([7, 9],2 ,8))
levelThree.addWall(new Wall([7, 17],10 ,2))
levelThree.addWall(new Wall([19, 7],10 ,2))
levelThree.addWall(new Wall([27, 9],2 ,8))

const levelFour = new Level([17, 13]);
levelFour.addWall(new Wall([7, 5],2 ,6))
levelFour.addWall(new Wall([9, 5],4 ,2))
levelFour.addWall(new Wall([7, 17],2 ,4))
levelFour.addWall(new Wall([9, 19],6 ,2))
levelFour.addWall(new Wall([21, 5],6 ,2))
levelFour.addWall(new Wall([27, 5],2 ,4))
levelFour.addWall(new Wall([23, 19],4 ,2))
levelFour.addWall(new Wall([27, 15],2 ,6))

const levelFive = new Level([17, 13]);
levelFive.addWall(new Wall([5, 9],4 ,2))
levelFive.addWall(new Wall([9, 5],2 ,6))
levelFive.addWall(new Wall([15, 5],6 ,2))
levelFive.addWall(new Wall([25, 5],2 ,6))
levelFive.addWall(new Wall([27, 9],4 ,2))
levelFive.addWall(new Wall([5, 15],4 ,2))
levelFive.addWall(new Wall([9, 15],2 ,6))
levelFive.addWall(new Wall([15, 19],6 ,2))
levelFive.addWall(new Wall([25, 15],2 ,6))
levelFive.addWall(new Wall([27, 15],4 ,2))


const levels = [
    levelOne,
    levelTwo,
    levelThree,
    levelFour,
    levelFive
]

export { Level, levels }