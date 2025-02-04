<script>
import { Categories } from '@/assets/Cereal.js'
export default{
    data(){
        return {
            search : '',
            checkboxes : {
                nutriA : false,
                nutriB : false,
                nutriC : false,
                nutriD : false,
                nutriE : false
            },
            category : 'none',
            Categories : Categories
        }
    },
    emits : [ "searchEv", "categoriesEv", "filterEv" ],
    computed : {
        nsChecked(){
            const result = [];
            if(this.checkboxes.nutriA){
                result.push('A')
            }
            if(this.checkboxes.nutriB){
                result.push('B')
            }
            if(this.checkboxes.nutriC){
                result.push('C')
            }
            if(this.checkboxes.nutriD){
                result.push('D')
            }
            if(this.checkboxes.nutriE){
                result.push('E')
            }
            return result
        }
    }
}
</script>

<template>
    <fieldset>
        <legend>Rechercher</legend>
        <input type="search" placeholder="Nom du céréale" id="search"
        v-on:input="$emit('searchEv', this.search)"
        v-model="this.search"
        >
    </fieldset>
    <fieldset id="filters">
        <legend>Filtrer</legend>
        <fieldset id="nutri">
            <legend>Nutriscore</legend>
            <label for="nutriA">A</label>
            <input type="checkbox" id="nutriA" v-model="this.checkboxes.nutriA"
            v-on:change="$emit('filterEv', this.nsChecked)">
            <label for="nutriB">B</label>
            <input type="checkbox" id="nutriB" v-model="this.checkboxes.nutriB"
            v-on:change="$emit('filterEv', this.nsChecked)">
            <label for="nutriC">C</label>
            <input type="checkbox" id="nutriC" v-model="this.checkboxes.nutriC"
            v-on:change="$emit('filterEv', this.nsChecked)">
            <label for="nutriD">D</label>
            <input type="checkbox" id="nutriD" v-model="this.checkboxes.nutriD"
            v-on:change="$emit('filterEv', this.nsChecked)">
            <label for="nutriE">E</label>
            <input type="checkbox" id="nutriE" v-model="this.checkboxes.nutriE"
            v-on:change="$emit('filterEv', this.nsChecked)">
        </fieldset>
        <fieldset>
            <legend>Catégorie</legend>
            <select v-on:change="$emit('categoriesEv', this.category)" v-model="this.category">
                <option value="none">Tous</option>
                <option v-bind:value="this.Categories.noSugars">Sans sucre</option>
                <option v-bind:value="this.Categories.lowSodium">Pauvre en sel</option>
                <option v-bind:value="this.Categories.boost">Boost</option>
            </select>
        </fieldset>
    </fieldset>
</template>