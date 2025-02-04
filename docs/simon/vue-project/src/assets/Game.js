export class Game {
    constructor(){
        this.gameColors = [];
        this.playerColors = [];
        this.score = 0;
        this.highscore = getHighscore();
    }

    get playerHaveLost() {
        let result = false;
        let i = 0;
        while (!result && i < this.playerColors.length){
            if (this.playerColors[i] !== this.gameColors[i]) {
                result = true
            }
        }
        return result;
    }

    get playerWonRound() {
        return !this.playerHaveLost && this.playerColors.length === this.gameColors.length
    }

    submitColor(_color){
        this.playerColors.push(_color);
        if (!this.playerHaveLost){
            this.score ++;
        } else {
            localStorage.setItem('highscore', this.score);
        }
    }

    static getHighscore(){
        const highscore = localStorage.getItem('highscore')
        return highscore? highscore : 0;
    }
}