<script>
    import { colors } from '@/assets/Color.js'
    import ColorButton from '@/components/ColorButton.vue'
    export default{
        data(){
            return {
                colors: colors
            }
        },
        components : { ColorButton }
    }
</script>

<template>
    <color-button v-for="aColor of colors" v-bind:color="aColor"></color-button>
</template>
