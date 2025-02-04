export class Cereal {
    /**
     * @param {Object} _cereal Takes a Cereal object, either from provided Json or a clone
     */
    constructor(_cereal){
        this.id = _cereal.id;
        this.name = _cereal.name;
        this.calories = _cereal.calories;
        this.protein = _cereal.protein;
        this.sodium = _cereal.sodium;
        this.fiber = _cereal.fiber;
        this.carbo = _cereal.carbo;
        this.sugars = _cereal.sugars;
        this.potass = _cereal.potass;
        this.vitamins = _cereal.vitamins;
        this.rating = _cereal.rating;
    }

    /**
     * returns a string of one character corresponding to it's nutriscore
     */
    get nutriscore() {
        switch (true){
            case (this.rating > 80):
                return 'A'
            case (this.rating > 70):
                return 'B'
            case (this.rating > 55):
                return 'C'
            case (this.rating > 35):
                return 'D'
            case (this.rating <= 35):
                return 'E'
        }
    }

    /**
     * returns an array of catergories this cereal falls in
     */
    get categories(){
        const result = [];
        if(this.sugars < 1){
            result.push(Categories.noSugars)
        }
        if (this.sodium < 50){
            result.push(Categories.lowSodium)
        }
        if(this.vitamins >= 25 && this.fiber >= 10){
            result.push(Categories.boost)
        }

        return result
    }
}

const Categories = {
    noSugars: 'No Sugars',
    lowSodium: 'Low Sodium',
    boost: 'Boost'
}

export{ Categories }