class Card{
    constructor(_name, _color, _possibleValues){
        this.name = _name;
        this.color = _color;
        this.possibleValues = _possibleValues
    }

    get singularValue(){
        let biggestValue = 0;
        for (const value of this.possibleValues){
            if (biggestValue < value){
                biggestValue = value;
            }
        }
        return biggestValue;
    }

    get isAce(){
        if (this.possibleValues.toString() === '1,11' || 
        this.possibleValues.toString() === '11,1'
    ){
        return true
    } else {
        return false;
    }
    }
    
    toString(){
        return `${this.name} of ${this.color}`
    }
}

export { Card }