import { Wall } from "./Wall.js";

class Entity{
    constructor(_pos){
        this.pos = _pos;
    }

    isColliding(_test){
        if (_test instanceof Wall){
            return _test.isColliding(this);
        } else {
            return this.pos.toString() === _test.pos.toString();
        }
    }
}

export { Entity }