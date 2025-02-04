<script>
import { Person } from "@/assets/Person.js";
import { Links } from "@/assets/Links.js"

export default {
    data(){
        return {
            personToAdd : new Person ({
                firstname : "",
                lastname : ""
            }),
            message : ""
        }
    },
    methods : {
        async addPerson(_event){
            _event.preventDefault();
            if(this.personToAdd.firstname.length < 3 ||
             this.personToAdd.firstname.length > 50 ||
             this.personToAdd.lastname.length < 3 ||
             this.personToAdd.lastname.length > 50){
                this.message = "* Le prénom et nom doivent avoir entre 3 et 50 caractères."
            } else {
                const response = await fetch(Links.database.peopleTable, {
                    method: "POST",
                    body: JSON.stringify(this.personToAdd),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
                const responseJson = await response.json();
                if (response.ok){
                    this.message = `* ${responseJson.firstname} ${responseJson.lastname} ajouté avec succès.`
                    this.$emit('person-added', responseJson)
                } else {
                    this.message = "* Erreur lors de la requête."
                }
            }
        }
    },
    emits: [ "person-added" ]
}
</script>

<template>
    <form>
        <label for="firstname">Prénom :</label>
        <input type="text" id="firstname" v-model="personToAdd.firstname">

        <label for="lastname">Nom :</label>
        <input type="text" id="lastname" v-model="personToAdd.lastname">

        <button v-on:click="addPerson">Ajouter</button>
        <p>{{ message }}</p>
    </form>
</template>

<style scoped>
    form {
        width: 350px;
        padding: 15px;
        gap: 5px;
        border: solid 1px black;
        display: grid;
        grid-template-columns: 1fr 3fr;
        align-items: center;
    }

    button {
        width: min-content;
        height: min-content;
    }
</style>
