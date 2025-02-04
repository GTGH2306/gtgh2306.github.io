import { Entity } from "./Entity.js";

class Segment extends Entity{
    setPosition(_pos){
        this.pos = _pos;
    }
}

export { Segment }