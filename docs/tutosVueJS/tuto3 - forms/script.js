const App = {
    data(){
        return {
            userInput: '',
            types : [
                {name: 'boolean'},
                {name: 'number'},
                {name: 'string'}
            ],
            userType: ''
        }
    },
    methods: {
        handleSubmit(_event){
            console.log('form submitted');
            
            //.target retourne l'element html qui a généré l'event (ici le form)
            //.'prenom' retourne l'élément html qui a l'attribut name="prenom"
            //.value retourne la valeur que l'utilisateur a saisi dans prenom
            console.log(_event.target.prenom.value);
        },
        handleChange(_event){
            //montre le 
            console.log(_event.target.validity)

            const variablePrenom = this[_event.target.prenom]
            variablePrenom.valid = _event.target.validity.valid;
            //Si le form submit event n'est pas valide
            if (!_event.target.validity.valid){
                //Si la valeur n'est pas définie
                if(_event.target.validity.valueMissing){
                    variablePrenom.errorMessage = variablePrenom.errorMessages.value
                } else {
                    variablePrenom.errorMessage = 'field not valid'
                }
            }
        }
    }
}

Vue.createApp(App).mount('#app')