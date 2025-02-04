const DEFAULT_SIZE = 16;
const MIN_SIZE = 8;
const MAX_SIZE = 48;

const app = {
    data() {
        return {
            taillePolice: DEFAULT_SIZE
        }
    },
    computed:{
        taillePoliceReel(){
            if (this.taillePolice < MIN_SIZE || this.taillePolice > MAX_SIZE){
                this.taillePolice = DEFAULT_SIZE;
            }
            return this.taillePolice;
        }
    },
    methods: {
        augmenterTaille() {
            this.taillePolice++
        },
        diminuerTaille() {
            this.taillePolice--
        }
    }
}

Vue.createApp(app).mount('#monApp');