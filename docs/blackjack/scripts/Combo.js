class Combo{
    constructor(_multiplier, _conditionFunc){
        this.multiplier = _multiplier;
        this.condition = _conditionFunc;
    }

    conditionIsMet(_hand){
        return this.condition(_hand)
    }
}

function isBlackjack(_hand){
    if(
        _hand.cards.length === 2 &&
        _hand.value === 21
    ){
        return true;
    } else {
        return false;
    }
}
function isTripleSeven(_hand){
    if (
        _hand.length === 3 &&
        _hand.cards[0].singularValue === 7 &&
        _hand.cards[1].singularValue === 7 &&
        _hand.cards[2].singularValue === 7
    ){
        return true
    } else {
        return false
    }
}


const blackjackCombo = new Combo(1.5, isBlackjack)
const tripleSevens = new Combo(3, isTripleSeven)

const combos = [
    blackjackCombo,
    tripleSevens
]

export { combos };