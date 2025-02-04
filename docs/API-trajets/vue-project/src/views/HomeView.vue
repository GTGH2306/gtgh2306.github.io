<script>
    import AddPersonForm from '@/components/AddPersonForm.vue';
    import EditPersonForm from '@/components/EditPersonForm.vue';
    import PeopleTable from '@/components/PeopleTable.vue';
    import { Links } from '@/assets/Links.js';
    export default {
        data(){
            return {
                message : "",
                personAdded : null,
                personEdited : null,
                personDeleted : null,
                personSelected : null,
                addPersonDialog : false,
                editPersonDialog : false,
                confirmDeleteDialog : false
            }
        },
        components: { AddPersonForm, EditPersonForm, PeopleTable },
        methods: {
            personAddedEv(_person){
                this.personAdded = _person
            },
            personEditdEv(_person){
                this.personEdited = _person
            },
            showAddPersonDialog(){
                this.addPersonDialog = this.addPersonDialog? false : true;
                this.message = "";
            },
            showEditPersonDialog(_person){
                if (!this.editPersonDialog){
                    this.editPersonDialog = true;
                    this.personSelected = _person;
                } else {
                    this.editPersonDialog = false;
                    this.personSelected = null;
                }
                this.message = "";
            },
            showDeletePersonConfirm(_person){
                if (!this.confirmDeleteDialog){
                    this.confirmDeleteDialog = true;
                    this.personSelected = _person;
                } else {
                    this.confirmDeleteDialog = false;
                    this.personSelected = null;
                }
                this.message = "";
            },
            async deleteSelectedPerson(){
                const response = await fetch(Links.database.peopleTable + "/" + this.personSelected.id, {
                    method: 'DELETE'
                })
                if(response.ok){
                    this.message = `${this.personSelected.firstname} ${this.personSelected.lastname} supprimé(e).`
                } else {
                    this.message = "Echec lors de la requête de suppresion."
                }
                this.personDeleted = this.personSelected;
                this.confirmDeleteDialog = false;
                this.personSelected = null;
            }
        }
    }
</script>

<template>
    <div>
        <people-table
        v-bind:personAddedProp = "this.personAdded"
        v-bind:personEditedProp = "this.personEdited"
        v-bind:personDeletedProp = "this.personDeleted"
        v-on:delete-person = "showDeletePersonConfirm"
        v-on:edit-person= "showEditPersonDialog"
        ></people-table>

        <p>{{ message }}</p>

        <button v-on:click="showAddPersonDialog">Ajouter une personne</button>
        <dialog v-if="addPersonDialog" open>
            <section>
                <add-person-form v-on:person-added="personAddedEv"></add-person-form>
                <button v-on:click="showAddPersonDialog">Fermer</button>
            </section>
        </dialog>

        <dialog v-if="editPersonDialog" open>
            <section>
                <edit-person-form
                v-bind:personToEditProp = "this.personSelected"
                v-on:person-edited="personEditdEv"
                ></edit-person-form>
                <button v-on:click="showEditPersonDialog">Fermer</button>
            </section>
        </dialog>

        <dialog v-if="confirmDeleteDialog" open>
            <section>
                <p>Êtes-vous sûr de vouloir supprimer <b>{{ personSelected.firstname }}  {{ personSelected.lastname }}</b>?</p>
                <div class="okOrCancel">
                    <button v-on:click="showDeletePersonConfirm">Annuler</button>
                    <button v-on:click="deleteSelectedPerson">Supprimer</button>
                </div>
            </section>
        </dialog>
    </div>

</template>

<style scoped>
    div {
        display: flex;
        gap: 5px;
        flex-direction: column;
    }
    ::backdrop {
        width: 100%;
        height: 100%;
        background-color: red;
    }
    form{
        margin-bottom: 20px;
    }
    button {
        width: fit-content;
    }
    .okOrCancel{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>
