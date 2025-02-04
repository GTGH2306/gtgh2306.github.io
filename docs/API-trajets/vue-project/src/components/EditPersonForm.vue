<script>
import { Person } from "@/assets/Person.js";
import { Links } from "@/assets/Links.js"

export default {
    data(){
        return {
            personToEdit : new Person(this.personToEditProp),
            message : ""
        }
    },
    methods : {
        async editPerson(_event){
            _event.preventDefault();
            if(this.personToEdit.firstname.length < 3 ||
             this.personToEdit.firstname.length > 50 ||
             this.personToEdit.lastname.length < 3 ||
             this.personToEdit.lastname.length > 50){
                this.message = "* Le prénom et nom doivent avoir entre 3 et 50 caractères."
            } else {
                const response = await fetch((Links.database.peopleTable + "/" + this.personToEdit.id), {
                    method: "PUT",
                    body: JSON.stringify(this.personToEdit),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
                const responseJson = await response.json();
                if (response.ok){
                    this.message = `* ${responseJson.firstname} ${responseJson.lastname} modifié avec succès.`
                    this.$emit('person-edited', responseJson)
                } else {
                    this.message = "* Erreur lors de la requête."
                }
            }
        }
    },
    emits: [ "person-edited" ],
    props: {
        personToEditProp : Object
    }
}
</script>

<template>
    <form>
        <label for="person-id">ID :</label>
        <input type="text" id="person-id" disabled v-model="personToEdit.id">

        <label for="firstname">Prénom :</label>
        <input type="text" id="firstname" v-model="personToEdit.firstname">

        <label for="lastname">Nom :</label>
        <input type="text" id="lastname" v-model="personToEdit.lastname">

        <button v-on:click="editPerson">Modifier</button>
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

    #person-id{
        width: min-content;
    }
</style>
