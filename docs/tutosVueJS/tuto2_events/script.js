const App = {
    data(){
        return {
            coins: 0
        }
    },
    methods: {
        handleClick(){
            this.coins ++;
        },
        outerClick(){
            console.log('outer click')
        }
    }
}

Vue.createApp(App).mount('#app')