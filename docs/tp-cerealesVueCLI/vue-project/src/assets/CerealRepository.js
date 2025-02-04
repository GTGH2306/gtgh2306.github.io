import { Cereal } from "./Cereal.js";

export class CerealRepository{
    /**
     * @param {Array} _cerealList Array of cereals
     */
    constructor(_cerealList){
        this.cereals = [];
        for (const cereal of _cerealList){
            this.cereals.push(new Cereal(cereal));
        }
    }

    /**
     * returns this.cereals array without items that don't match the search term
     * @param {string} _searchTerm 
     */
    searchName(_searchTerm){
        const result = []
        _searchTerm = _searchTerm.toLowerCase();
        for (const cereal of this.cereals){
            if (cereal.name.toLowerCase().includes(_searchTerm)){
                result.push(cereal);
            }
        }
        return result;
    }
    
    /**
     * returns this.cereals with nutriscore matching the string array
     * @param {string[]} _filter 
     */
    filterNutriscore(_filter){
        const result = []
        for (const cereal of this.cereals){
            if(_filter.includes(cereal.nutriscore)){
                result.push(cereal);
            }
        }
        return result;
    }

    /**
     * returns this.cereals without items that aren't in specified category
     * @param {Cereal.Category} _category 
     */
    fromCategory(_category){
        const result = []
        for (const cereal of this.cereals){
            if (cereal.categories.includes(_category)){
                result.push(cereal);
            }
        }
        return result;
    }

    /**
     * removes cereal from this.cereals with matching id
     * @param {number} _idToDelete 
     */
    delete(_idToDelete){
        this.cereals = this.cereals.filter(cereal => cereal.id !== _idToDelete)
    }

    /**
     * returns an array with only entries _array1 and _array2 have in common
     * @param {Array} _array1 
     * @param {Array} _array2 
     */
    static commonEntries(_array1, _array2){
        // if (_array1.length === 0){
        //     return _array2;
        // } else if (_array1.length === 0){
        //     return _array1;
        // }
        return _array1.filter(o1 => _array2.some(o2 => o1 === o2));
    }

    sortBy(_term){
        const originalOrderString = JSON.stringify(this.cereals);
        let sortedCerealsString;
        const compareNumbers = (_a, _b) => {
            return _a[_term] - _b[_term];
        }
        const compareStrings = (_a, _b) => {
            return _a[_term] > _b[_term]? 1:-1
        }

        if(typeof this.cereals[0][_term] === "string"){
            sortedCerealsString = JSON.stringify(this.cereals.sort(compareStrings));
        } else {
            sortedCerealsString = JSON.stringify(this.cereals.sort(compareNumbers));
        }
        if(originalOrderString === sortedCerealsString) {
            this.cereals = this.cereals.reverse();
        }
        return this.cereals
    }
}