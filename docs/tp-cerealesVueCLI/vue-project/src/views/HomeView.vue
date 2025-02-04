<script>
    import CerealsTable from '@/components/CerealsTable.vue'
    import CerealSearch from '@/components/CerealSearch.vue'
    export default {
        data(){
            return {
                search : '',
                nsChecked : [],
                categoryEv : 'none'
            }
        },
        methods :{
            searchEv(_searchTerm){
                this.search = _searchTerm
            },
            filterEv(_nsChecked){
                this.nsChecked = _nsChecked
            },
            categoriesEv(_categoryEv){
                this.categoryEv = _categoryEv
            }
        },
        components : { CerealsTable, CerealSearch }
    }
</script>

<template>
    <h1>Cereals</h1>
    <cereal-search
    v-on:searchEv="searchEv"
    v-on:filterEv="filterEv"
    v-on:categoriesEv="categoriesEv"
    ></cereal-search>
    <cereals-table
    v-bind:searchTerm="this.search"
    v-bind:filterNs="this.nsChecked"
    v-bind:categorySelected = "this.categoryEv"
    ></cereals-table>
</template>

<style>
    @import '@/assets/style.css';
</style>