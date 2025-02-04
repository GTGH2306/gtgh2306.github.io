import { Person } from "./person.js"

const names = ['Mike Dev', 'John Makenzie', 'Léa Grande']

const app = {
    data(){
        return {
            people : [],
            confirmMsg : '',
            prenom: '',
            nom : ''
        }
    },
    mounted() {
        for (const _name of names){
            this.people.push(new Person(_name))
        }
    },
    methods: {
        ajouterPersonne() {
            //const prenom = document.getElementById('prenom').value;
            //const nom = document.getElementById('nom').value;
            const person = new Person((this.prenom + ' ' + this.nom));
            this.people.push(person);
            this.confirmMsg = person.addedMsg;
        },
        deleteRow(_event) {
            const index = _event.target.dataset.idx;

            const person = this.people[index]
            this.confirmMsg = person.deletedMsg
            this.people.splice(index, 1)
        }
    }
}

Vue.createApp(app).mount('#monApp');
