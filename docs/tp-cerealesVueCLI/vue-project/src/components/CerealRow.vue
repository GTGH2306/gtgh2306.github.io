<script>
    import { Cereal } from "@/assets/Cereal.js";
    export default{
        props : {
            cereal : Cereal
        },
        emits : [ 'delete' ]
    }
</script>

<template>
    <tr>
        <td>{{ cereal.id }}</td>
        <td class="tableName">{{ cereal.name }}</td>
        <td>{{ cereal.calories }}</td>
        <td>{{ cereal.protein }}</td>
        <td>{{ cereal.sodium }}</td>
        <td>{{ cereal.fiber }}</td>
        <td>{{ cereal.carbo }}</td>
        <td>{{ cereal.sugars }}</td>
        <td>{{ cereal.potass }}</td>
        <td>{{ cereal.vitamins }}</td>
        <td>{{ cereal.rating }}</td>
        <td v-bind:class="cereal.nutriscore">{{ cereal.nutriscore }}</td>
        <td><button v-on:click="$emit('delete', cereal.id)" class="deleteButton">❌</button></td>
    </tr>
</template>

<style>

</style>