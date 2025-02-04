import { Entity } from "./Entity.js";
import { Segment } from "./Segment.js";

const DIRECTION = {
    UP : [0, -1],
    RIGHT : [1, 0],
    DOWN : [0, 1],
    LEFT : [-1, 0],
    NONE : [0, 0]
}


class Snake extends Entity{

    constructor(_pos, _length){
        super(_pos);
        this.length = _length;
        this.segments = [];
        this.addSegments(_length)
        this.direction = DIRECTION.NONE;
    }
    addSegment(){
        let newSegment;
        if (this.segments.length === 0) {
            newSegment = new Segment(this.pos);
        } else {
            newSegment = new Segment(this.segments[this.segments.length - 1].pos);
        }
        this.segments.push(newSegment)
    }

    addSegments(_nbOfSegments) {
        for (let i = 0; i < _nbOfSegments; i++){
            this.addSegment();
        }
    }

    go(_direction){
        const initialPos = [this.pos[0], this.pos[1]];

        if (_direction == DIRECTION.NONE){
            _direction = this.direction;
        }
        if(
            this.direction [0] + _direction[0] === 0 && this.direction [1] + _direction[1] === 0
        ) {
            _direction = this.direction;
        }

        this.pos[0] += _direction[0];
        this.pos[1] += _direction[1];
        this.direction = _direction;

        for (let i = this.segments.length - 1; i >= 0; i--){
            if (i === 0 || this.segments[i].pos.toString() === this.pos.toString()) {
                this.segments[i].pos = initialPos;
            } else {
                this.segments[i].pos = [this.segments[i - 1].pos[0], this.segments[i - 1].pos[1]];
            }
        }
    }

    logSnake(){
        let retour = '';
        retour += 'Tête: ' + this.pos;
        for (const _segment of this.segments){
            retour += ' Segment: ' + _segment.pos
        }
        return retour;
    }

    static get DIRECTION(){
        return DIRECTION;
    }
}

export { Snake }