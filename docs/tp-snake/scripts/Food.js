import { Entity } from "./Entity.js";

const FOOD_GROW = 3;

class Food extends Entity {

    static get FOOD_GROW(){
        return FOOD_GROW;
    }
}

export { Food };