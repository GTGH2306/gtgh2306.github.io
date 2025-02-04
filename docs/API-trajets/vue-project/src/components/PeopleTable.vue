<script>
    import { Links } from '@/assets/Links.js';
    import { Person } from '@/assets/Person.js';
    export default {
        data(){
            return {
                people : []
            }
        },
        async mounted(){
            const response = await fetch(Links.database.peopleTable);
            const data = await response.json();
            for (const _person of data){
                this.people.push(new Person(_person))
            }
        },
        props : {
            personAddedProp : Object,
            personEditedProp : Object,
            personDeletedProp : Object
        },
        watch: {
            personAddedProp(){
                this.addPerson(this.personAddedProp)
            },
            personEditedProp(){
                this.editPerson(this.personEditedProp)
            },
            personDeletedProp(){
                this.deletePerson(this.personDeletedProp)
            }
        },
        methods: {
            addPerson(_person){
                if (_person !== null){
                    this.people.push(new Person(_person))
                }
            },
            editPerson(_person){
                if (_person !== null){
                    const personIndex = this.people.findIndex(
                        (_element) => _element.id === _person.id
                    )
                    this.people.splice(personIndex, 1, _person);
                }
            },
            deletePerson(_person){
                if (_person !== null){
                    const personIndex = this.people.findIndex(
                        (_element) => _element.id === _person.id
                    )
                    this.people.splice(personIndex, 1);
                }
            }
        },
        emits: [ "edit-person", "delete-person" ]
    }
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Modifier</th>
                <th>Supprimer</th>
            </tr>
        </thead>
        <tbody v-if="people.length > 0">
            <tr v-for="(person, id) of people" :key="id">
                <td>{{ person.id }}</td>
                <td>{{ person.firstname }}</td>
                <td>{{ person.lastname }}</td>
                <td><button v-on:click="$emit('edit-person', person)">📝</button></td>
                <td><button v-on:click="$emit('delete-person', person)">❌</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
    table {
        border: solid 1px black;
        border-collapse: collapse;
        width: fit-content;
    }
    tbody tr{
        background-color: var(--tbody);
    }
    tbody tr:nth-child(even){
    background-color: var(--tablealt);
    }
    tbody tr:hover {
        background-color: var(--highlight);
    }
    td, th {
        border: solid 1px black;
        padding: 5px;
    }

    td button {
        margin-left: auto;
        margin-right: auto;
        background-color: var(--bg);
        width: 30px;
        padding: 5px;
        border-radius: 5px;
        border: none;
    }
    td button:hover {
        background-color: var(--tbody);
        cursor: pointer;
    }
</style>