const app = {
    data(){
        return{
            message: 'Dog pictures',
            imageSource: 'https://i.seadn.io/gae/GceHnReGU-FwdJ_mGJiCUJnHoP1EuqCHpiqX30FtssTv5ifsPWoGB83-cFX50XINHNpSsjfIcoyAH-K7GCLai0UyULmWpS3cRkau?auto=format&dpr=1&w=1000',
            imageAlt: 'gnomed',
            titleClasses: {
                important: true,
                red: true,
                blue: false
            },
            count: 5,
            tabeulo: [
                'Optimus Prime',
                'Un mec random',
                'L\'inquisiteur'
            ]
        }
    },
    methods : {
        impBtn(){
            this.titleClasses.important = !this.titleClasses.important
        },
        wohloBtn(){
            this.titleClasses.blue = !this.titleClasses.blue
            this.titleClasses.red = !this.titleClasses.red
        },
        minusCount(){
            this.count--;
        }
    }
}

Vue.createApp(app).mount('#app')