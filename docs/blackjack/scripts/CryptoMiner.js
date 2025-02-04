class CryptoMiner{
    constructor(_cryptoEachPrint, _price, _tickToPrint, _tier){
        this.cryptoEachPrint = _cryptoEachPrint;
        this.price = _price;
        this.tickToPrint = _tickToPrint;
        this.tickUntilNextPrint = 0;
        this.tier = _tier;
    }

    print(){
        if(this.canPrint){
            this.tickUntilNextPrint =  this.tickToPrint;
            return this.cryptoEachPrint;
        } else {
            return 0;
        }
    }

    get canPrint(){
        return this.tickUntilNextPrint <= 0
    }

    get percentToPrint(){
        return Math.floor(((this.tickToPrint - this.tickUntilNextPrint) / this.tickToPrint) * 100)
    }
}

const cryptoMiners = [
    new CryptoMiner(100, 0, 300, 0),
    new CryptoMiner(500, 1000, 360, 1),
    new CryptoMiner(2000, 5000, 480, 2),
    new CryptoMiner(10000, 40000, 600, 3)
]

export{ cryptoMiners }