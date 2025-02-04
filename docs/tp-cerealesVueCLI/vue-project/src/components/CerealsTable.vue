<script>
    import { CerealRepository } from '@/assets/CerealRepository.js'
    import { DataProvider } from '@/assets/DataProvider.js'
    import CerealRow from '@/components/CerealRow.vue'
export default{
    components: { CerealRow },
    data() {
        return {
            repository : null
        }
    },
    async created() {
        let cereals = await DataProvider.fetchData('https://arfp.github.io/tp/web/javascript2/10-cereals/cereals.json');
        this.repository = new CerealRepository(cereals.data);
    },
    methods: {
        deleteEv(_id){
            this.repository.delete(_id)
        },
        sort(_event){
            const term = _event.target.dataset.term
            return this.repository.sortBy(term)
        }
    },
    computed : {
        realCereal() {
            let result = this.repository? this.repository.cereals: null;
            if (this.repository){
                const searchResult = this.searchTerm? this.repository.searchName(this.searchTerm) : this.repository.cereals;
                const filterResult = this.filterNs.length > 0? this.repository.filterNutriscore(this.filterNs) : this.repository.cereals;
                const categoryResult = this.categorySelected !== "none"? this.repository.fromCategory(this.categorySelected) : this.repository.cereals;
                
                result = CerealRepository.commonEntries(result, searchResult)
                
                result = CerealRepository.commonEntries(result, filterResult)

                if (categoryResult.length > 0){
                    result = CerealRepository.commonEntries(result, categoryResult)
                } else {
                    result = []
                }
            }
            return result;
        },
        avgCalories(){
            let total = 0
            if (this.realCereal.length > 0){
                for (const cereal of this.realCereal){
                    total += cereal.calories;
                }
                total /= this.realCereal.length
            }
            return Math.floor(total)
        }
    },
    props : {
        searchTerm: String,
        filterNs: Array,
        categorySelected : String
    }
}
</script>


<template>
    <table v-if="this.repository !== null">
        <thead>
            <tr>
                <th v-on:click="sort" data-term="id">ID</th>
                <th class="tableName" v-on:click="sort" data-term="name">NOM</th>
                <th v-on:click="sort" data-term="calories">CALORIES</th>
                <th v-on:click="sort" data-term="protein">PROTEÏNES</th>
                <th v-on:click="sort" data-term="sodium">SEL</th>
                <th v-on:click="sort" data-term="fiber">FIBRES</th>
                <th v-on:click="sort" data-term="carbo">GLUCIDES</th>
                <th v-on:click="sort" data-term="sugars">SUCRE</th>
                <th v-on:click="sort" data-term="potass">POTASSIUM</th>
                <th v-on:click="sort" data-term="vitamins">VITAMINES</th>
                <th v-on:click="sort" data-term="rating">EVALUATION</th>
                <th v-on:click="sort" data-term="rating">NS</th>
                <th>DEL</th>
            </tr>
        </thead>
        <tbody>
            <cereal-row v-for="cereal of this.realCereal" v-bind:cereal="cereal" v-on:delete="deleteEv" v-if="this.realCereal.length > 0"></cereal-row>
            <tr v-else>
                <td></td>
                <td>Aucun Resultat</td>
                <td colspan="10"></td>
                <td></td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td>{{ this.realCereal.length }} éléments</td>
                <td>Moyenne calories {{ this.avgCalories }}</td>
            </tr>
        </tfoot>
    </table>
</template>


<style>

</style>