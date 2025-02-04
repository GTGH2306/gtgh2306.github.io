import { combos } from "./Combo.js"

class Hand{
    constructor(){
        this.cards = []
        this.bet = 0;
        this.modifier = 0;
        this.doubleAvailable = true;
        this.onStay = false;
    }

    get value(){
        let totalWithoutAces = 0;
        let nbOfAces = 0;
        let total = 0;
        for (const _card of this.cards){
            if (_card.isAce){
                nbOfAces++;
            } else {
                totalWithoutAces += _card.possibleValues[0] 
            }
        }
        total = totalWithoutAces
        for (let i = 0; i < nbOfAces; i++){
            if (total + 11 > 21){
                total += 1;
            } else {
                total += 11;
            }
        }
        return total + this.modifier;
    }

    get comboMod(){
        let comboMod = 1;
        for (const _combo of combos){
            if(_combo.conditionIsMet(this) && _combo.multiplier > comboMod){
                comboMod = _combo.multiplier;
            }
        }
        return comboMod;
    }

    get busted(){
        return this.value > 21
    }
}

export { Hand }