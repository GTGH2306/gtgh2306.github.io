export class DataProvider{
    /**
     * @param {String} _url local or distant url of the json your want data from
     */
    static async fetchData(_url){
        let response = await fetch(_url);
        let json = await response.json();
        return json 
    }
}