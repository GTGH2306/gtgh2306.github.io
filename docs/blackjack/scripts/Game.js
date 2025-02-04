import { DeckOfCards } from "./DeckOfCards.js";
import { Hand } from "./Hand.js";
import { cryptoMiners } from "./CryptoMiner.js";

const CHOICES = {
    HIT : 'HIT',
    STAY : 'STAY',
    DOUBLE : 'DOUBLE',
    SPLIT : 'SPLIT'
}

class Game{
    constructor(){
        this.nbOfDecks = 3;
        this.nbOfTurnForNewCards = 10;
        this.turnCounter = 0;
        this.playerMoney = loadPlayerMoney();
        this.playerHands = [];
        this.dealerHands = [];
        this.gameDeck = new DeckOfCards(this.nbOfDecks);
        this.currentCryptoMiner = loadCryptoMiner();
    }

    startGame(_bet){
        if (this.playerMoney - _bet >= 0 && _bet > 0){
            this.playerMoney -= _bet;
            this.giveInitialHands();
            this.playerHands[0].bet = _bet
            localStorage.setItem('playerMoney', this.playerMoney)
        }
    }

    giveInitialHands(){
        this.playerHands = [new Hand()];
        this.dealerHands = [new Hand()];
        this.dealerHands[0].cards.push(this.gameDeck.drawRandomCard());
        this.playerHands[0].cards.push(this.gameDeck.drawRandomCard());
        this.dealerHands[0].cards.push(this.gameDeck.drawRandomCard());
        this.playerHands[0].cards.push(this.gameDeck.drawRandomCard());
        if(this.playerHands[0].value === 21){
            this.playerHands[0].onStay = true;
        }
    }

    turn(_choice, _hand){
        _hand.doubleAvailable = false;
        switch (_choice){
            case CHOICES.HIT:
                _hand.cards.push(this.gameDeck.drawRandomCard())
                if (_hand.value >= 21){
                    _hand.onStay = true;
                }
                break;
            case CHOICES.STAY:
                _hand.onStay = true;
                break;
            case CHOICES.SPLIT:
                const cardPopped = _hand.cards.pop()
                const newHand = new Hand();

                newHand.bet = Math.round(_hand.bet / 2);
                _hand.bet = Math.round(_hand.bet / 2);

                newHand.doubleAvailable = false;
                newHand.cards.push(cardPopped);

                this.turn(CHOICES.HIT , _hand);
                this.turn(CHOICES.HIT , newHand);

                this.playerHands.push(newHand);

                break;
            case CHOICES.DOUBLE:
                _hand.cards.push(this.gameDeck.drawRandomCard())
                _hand.onStay = true;
                this.playerMoney -= _hand.bet;
                _hand.bet *= 2;
                break;
        }
    }

    dealerTurn(){
        if(this.dealerHands[0].value < 17){
            this.turn(CHOICES.HIT, this.dealerHands[0])
        } else {
            this.turn(CHOICES.STAY, this.dealerHands[0])
        }
    }

    choicesAvailable(_hand){
        const choices = []
        const previousHand = this.playerHands[this.playerHands.indexOf(_hand) - 1]
        if (previousHand === undefined ||
        this.choicesAvailable(previousHand).length === 0){
            if (!_hand.onStay && _hand.value != 21) {
                choices.push(CHOICES.STAY)
                if (_hand.value < 21) {
                    choices.push(CHOICES.HIT)
                }
                if (_hand.doubleAvailable && this.playerMoney - _hand.bet >= 0){
                    choices.push(CHOICES.DOUBLE)
                }
                if (_hand.cards.length === 2 &&
                    _hand.cards[0].name === _hand.cards[1].name
                ){
                    choices.push(CHOICES.SPLIT)
                }
            }
        }
        return choices;
    }

    endCurrentTurn(){
        for(const _hand of this.playerHands){
            let hasWon;
            const winResult = {
                PLAYERWIN: 'PLAYERWIN',
                DEALERWIN: 'DEALERWIN',
                DRAW: 'DRAW'
            }

            if(_hand.busted){
                hasWon = winResult.DEALERWIN;
            } else if(
                _hand.value === this.dealerHands[0].value &&
                _hand.comboMod === this.dealerHands[0].comboMod
            ){
                hasWon = winResult.DRAW;
            } else if(
                _hand.value === this.dealerHands[0].value &&
                _hand.comboMod > this.dealerHands[0].comboMod
            ){
                hasWon = winResult.PLAYERWIN;
            } else if(
                _hand.value === this.dealerHands[0].value &&
                _hand.comboMod < this.dealerHands[0].comboMod
            ){
                hasWon = winResult.DEALERWIN;
            } else if(_hand.value > this.dealerHands[0].value || this.dealerHands[0].busted){
                hasWon = winResult.PLAYERWIN;
            } else if (this.dealerHands[0].value > _hand.value && !this.playerHands[0].busted){
                hasWon = winResult.DEALERWIN;
            }

            if (
                hasWon !== winResult.DEALERWIN
            ){
                this.playerMoney += _hand.bet;
            }
            if (hasWon === winResult.PLAYERWIN) {
                this.playerMoney += Math.round(_hand.bet * _hand.comboMod);
            }
        }

        this.playerHands = [];
        this.dealerHands = [];


        if (this.turnCounter < this.nbOfTurnForNewCards){
            this.turnCounter ++;
        } else {
            this.turnCounter = 0;
            this.gameDeck = new DeckOfCards(this.nbOfDecks);
        }
    }

    upgradeCryptoMiner(){
        if (this.canUpgradeCryptoMiner)
        {
            this.currentCryptoMiner = cryptoMiners[this.currentCryptoMiner.tier + 1];
            this.playerMoney -= this.currentCryptoMiner.price;
        }
    }

    printCrypto(){
        if(this.canPrintCrypto){
            this.playerMoney = parseInt(this.playerMoney) + this.currentCryptoMiner.print();
        }
    }

    get playerCanPlay(){
        let canPlay = false;
        let i = 0;
        while(!canPlay && i < this.playerHands.length){
            if (this.playerHands[i].onStay === false){
                canPlay = true;
            }
            i++;
        }
        return canPlay;
    }

    get canUpgradeCryptoMiner(){
        const cryptoTier = this.currentCryptoMiner.tier;
        if(this.playerMoney >= cryptoMiners[cryptoTier + 1].price){
            return true
        } else {
            return false
        }
    }

    get canPrintCrypto(){
        return this.currentCryptoMiner.canPrint
    }

    static get CHOICES(){
        return CHOICES;
    }
}

function loadCryptoMiner(){
    let cryptoTier = localStorage.getItem('cryptoTier');
    if (cryptoTier !== null){
        return cryptoMiners[cryptoTier]
    } else {
        return cryptoMiners[0]
    }
}

function loadPlayerMoney(){
    const money = localStorage.getItem('playerMoney')
    return money ? money : 0
}

export { Game }