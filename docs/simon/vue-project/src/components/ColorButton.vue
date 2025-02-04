<script>
    export default {
        data() {
            return {
                isLit : false,
            }
        },
        methods: {
            onPressTest(){
                if (this.isLit){
                    this.isLit = false;
                } else {
                    this.isLit = true;
                }
            }
        },
        props : {
            color : Object
        }
    }
</script>

<template>
    <button v-bind:style="{ backgroundColor: isLit ? color.hexCode : color.darkCode }"
    v-on:click="onPressTest">{{ color.name }}</button>
</template>

<style>
    button{
        padding: 20px;
        margin-right: 5px;
    }
</style>