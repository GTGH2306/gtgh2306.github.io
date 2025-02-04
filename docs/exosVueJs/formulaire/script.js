const app = {
    data() {
        return {
            age : 0,
            prenom : '',
            phrase : phraseParDefaut,
            estMajeur : '',
            retraite : ''
        }
    },
    methods : {
        valider() {
            if (new RegExp('[A-Za-z]{2,}').test(this.prenom) &&
            Number.isInteger(Number(this.age)) &&
            Number(this.age) > 0
        ){
                this.phrase = 'Bonjour ' + this.prenom + ', votre âge est : ' + this.age;
                this.estMajeur = this.age > 17?
                    'Vous êtes Majeur.' :
                    'Vous êtes Mineur.';
                if (Number(this.age) == 64) {
                    this.retraite = 'Vous prenez votre retraite cette année.';
                } else if (Number(this.age) > 64) {
                    this.retraite = 'Vous êtes à la retraite depuis ' + (Number(this.age) - 64) + ' an(s).'
                } else {
                    this.retraite = 'Vous prenez votre retraite dans ' + (64 - Number(this.age)) + ' an(s).'
                }
            } else {
                this.phrase = phraseParDefaut;
                this.estMajeur = '';
                this.retraite = '';
            }

            

        },
        vider() {
            this.prenom = '';
            this.age = 0;
            this.phrase = phraseParDefaut;
            this.estMajeur = '';
            this.retraite = '';
        }
    }
}

const phraseParDefaut = 'Compléter/corriger le formulaire.';

Vue.createApp(app).mount('#monApp');