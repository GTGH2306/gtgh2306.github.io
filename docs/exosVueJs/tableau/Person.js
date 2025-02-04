class Person {
    constructor(_fullname) {
        this.name = _fullname.split(' ')[1];
        this.firstname = _fullname.split(' ')[0];
    }

    get mail(){
        return `${this.firstname.toLowerCase()}.${this.name.toLowerCase()}@example.com`
    }

    get addedMsg(){
        return (this.firstname + ' ' + this.name) + ' ajouté !'
    }

    get deletedMsg(){
        return (this.firstname + ' ' + this.name) + ' supprimé !'
    }
}

export { Person }