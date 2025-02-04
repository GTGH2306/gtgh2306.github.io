
import { Card } from './Card.js'
const COLORS = ['Spades', 'Clubs', 'Hearts', 'Diamonds']
const NAMES = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Height', 'Nine', 'Ten', 'Jack', 'Queen', 'King']

class DeckOfCards{
    constructor(_nbOfDecks){
        this.cards = [];
        for (let i = 0; i < _nbOfDecks; i++){
            for (const _color of COLORS){
                for(const _name of NAMES){
                    if(_name === 'Ace'){
                        this.cards.push(new Card(_name, _color, [1, 11]))
                    } else if (_name === 'Jack' || _name === 'Queen' || _name === 'King'){
                        this.cards.push(new Card(_name, _color, [10]))
                    } else {
                        this.cards.push(new Card(_name, _color, [NAMES.indexOf(_name) + 1]))
                    }
                }
            }
        }
    }

    drawRandomCard(){
        const cardId = Math.floor(Math.random() * this.cards.length)
        return this.cards.splice(cardId, 1)[0]
    }

    static get COLORS(){
        return COLORS;
    }

    static get NAMES(){
        return NAMES;
    }

}

export { DeckOfCards }