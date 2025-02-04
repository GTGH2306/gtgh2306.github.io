<script>
    const MIN_SIZE = 8;
    const MAX_SIZE = 48;
    const DEFAULT_SIZE = 16;

    export default {
        data(){
            return {
                fontSize: DEFAULT_SIZE
            }
        },
        computed : {
            realFontSize(){
                if (this.fontSize > MAX_SIZE ||
                    this.fontSize < MIN_SIZE
                ) {
                    this.fontSize =  DEFAULT_SIZE;
                }
                return this.fontSize;
            }
        },
        methods : {
            incrementSize(){
                this.fontSize++;
            },
            decreaseSize(){
                this.fontSize--;
            }
        }
    }
</script>

<template>
    <button @click="incrementSize">Augmenter la taille du texte</button>
    <button @click="decreaseSize">Diminuer la taille du texte</button>
    <span>Saisie manuelle : <input type="number" v-model="fontSize"></input> px</span>
    <p :style="{ 'font-size': realFontSize + 'px' }">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, velit tempora! Corrupti aspernatur sit accusamus corporis alias officia dignissimos ratione. Perferendis ducimus, veniam dignissimos numquam cumque aliquam animi. Eius, dolores?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dicta similique itaque, exercitationem, repellat officiis dolores eos qui fuga quos nisi cumque, aperiam quaerat quibusdam neque. Blanditiis reprehenderit earum tenetur.
    </p>
</template>

<style scoped>
    button, input {
        margin-right: 10px;
    }
    input {
        width: 40px;
    }
</style>