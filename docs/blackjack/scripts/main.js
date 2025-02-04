import { DeckOfCards } from "./DeckOfCards.js";
import { Hand } from "./Hand.js"
import { Game } from "./Game.js"

const normalHand = new Hand();
normalHand.cards.push(new DeckOfCards(1).cards[5]);
normalHand.cards.push(new DeckOfCards(1).cards[6]);

const blackJack = new Hand();
blackJack.cards.push(new DeckOfCards(1).cards[0]);
blackJack.cards.push(new DeckOfCards(1).cards[11]);

function save(){
        localStorage.setItem('cryptoTimer', game.currentCryptoMiner.tickUntilNextPrint)
        localStorage.setItem('playerMoney', game.playerMoney)
        localStorage.setItem('cryptoTier', game.currentCryptoMiner.tier)
}

const game = new Game();
window.addEventListener('beforeunload', save)


const app = {
    data(){
        return{
            game: game,
            moneyBet: 10,
        }
    },
    mounted() {
        const cryptoTimer = localStorage.getItem('cryptoTimer');
        const playerMoney = localStorage.getItem('playerMoney');
        if (cryptoTimer){
            this.game.currentCryptoMiner.tickUntilNextPrint = cryptoTimer
        }
        if(playerMoney){
            this.game.playerMoney = playerMoney;
        }

        setInterval(() => {
            if(this.game.currentCryptoMiner.tickUntilNextPrint > 0){
                this.game.currentCryptoMiner.tickUntilNextPrint--;
            }
        }, 1000)
    },
    methods: {
        playerTurn(_event){
            const choice = _event.target.dataset.choice;
            const handid = _event.target.dataset.handid;
            this.game.turn(choice, this.game.playerHands[handid]);
        },
        bet(){
            this.game.startGame(this.moneyBet);
        },
        // playerHand(_id){
        //     return this.game.playerHands[_id]
        // },
        nextStepBtn(){
            if(this.game.dealerHands[0].onStay){
                this.game.endCurrentTurn();
            } else {
                this.game.dealerTurn();
            }
        },
        printCrypto(){
            this.game.printCrypto();
        },
        upgradeCryptoMiner(){
            this.game.upgradeCryptoMiner();
        },
        storageClear(){
            localStorage.clear();
            window.removeEventListener('beforeunload', save)
        }
    }
}

Vue.createApp(app).mount('#app')