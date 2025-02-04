class Theme{
    constructor(_themeName){
        this.themeName = _themeName;
        this.jsonTheme = loadJson(_themeName);
    }
    getImgUrl(_cardId){
        const indexOfCard = this.jsonTheme.findIndex(item => item.id ===_cardId);
        return `./src/assets/themes/${this.themeName}/${this.jsonTheme[indexOfCard].name}`;
    }
    async loadJson(_themeName){
        return await fetch(`./src/assets/themes/${_themeName}.json`)
    }
}

export { Theme }