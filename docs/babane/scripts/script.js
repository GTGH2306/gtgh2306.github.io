let farmsProps = [Babanier, Contrat, Hydro, Nft, Robot]
let farmTab = [];
let babanes = 0
const tickrate = 100;
let timeoutHandle;


window.addEventListener('load', function() {
    
    startingRoutine();

    setInterval(function(){
        babanes += (getGlobalBps() / 1000) * tickrate;
        
        document.getElementById('bpstxt').innerHTML = 'BPS: ' + Math.round(getGlobalBps() * 10) / 10;

        showBabanes();
    }, tickrate);
});


document.getElementById('babaneImg').addEventListener('click', function(){
    playAnimation();
    babanes += 1 + farmTab[0].getBps();
    showBabanes();
});

window.addEventListener('beforeunload', function(){
    sauvegarder();
});


function playAnimation(){
    let babane = document.getElementById('babaneImg');

    if (babane.classList.contains('clicBabane')){
        clearTimeout(timeoutHandle);
        babane.classList.remove('clicBabane');
    }

    setTimeout(() =>{
        babane.classList.add('clicBabane');
    }, 1);

    timeoutHandle = setTimeout(() =>{
        babane.classList.remove('clicBabane')
    }, 300);

}

function showBabanes(){
    document.getElementById('babaneNb').innerHTML = Math.round(babanes*10)/10;
}

function Farm(_proprietes){
    this.id = _proprietes.id;
    this.nom = _proprietes.nom;
    this.initCost = _proprietes.initCost;
    this.initBps = _proprietes.initBps;
    this.img = _proprietes.img;
    this.numberOf = 0;
    this.getBps = function(){
        return Math.round(this.numberOf * this.initBps * 10)/10;
    }
    this.getCost = function(){
        //return Math.floor(Math.pow(this.initCost, (1 + (this.numberOf / 10))));
        return Math.floor(this.initCost * Math.exp(0.2 * this.numberOf));
    };
    this.buy = function(){
        if (babanes - this.getCost() >= 0){
            babanes -= this.getCost();
            this.numberOf ++;
            if (farmTab.indexOf(this) == farmTab.length - 1 && farmTab.length < farmsProps.length) {
                farmTab.push(new Farm(farmsProps[farmTab.length]))
                elementForFarm(farmTab[farmTab.length - 1])
            }
            refreshFarmElements();
        }
    }
}

function elementForFarm(_farm){
    let element = document.createElement('div');
    let titre = document.createElement('h3');
    let icon = document.createElement('img');
    let pFarmNb = document.createElement('p');
    let buyButton = document.createElement('input');
    let pPrixTxt = document.createElement('p');
    let pPrixNb = document.createElement('p');
    let pBpsTxt = document.createElement('p');
    let pBpsNb = document.createElement('p');

    element.classList.add('farm');

    titre.innerHTML= _farm.nom;
    element.appendChild(titre);

    icon.src = _farm.img;
    element.appendChild(icon);

    pFarmNb.id = _farm.id + 'Nb';
    pFarmNb.classList.add('numberOf');
    pFarmNb.innerHTML = 'x ' + _farm.numberOf;
    element.appendChild(pFarmNb);

    buyButton.type = 'button';
    buyButton.value = 'Acheter';
    buyButton.id = _farm.id + 'Buy';
    buyButton.addEventListener('click', () => _farm.buy());
    element.appendChild(buyButton);

    pPrixTxt.innerHTML = 'Prix: ';
    element.appendChild(pPrixTxt);

    pPrixNb.id = _farm.id + 'Prix';
    pPrixNb.classList.add('tag');
    pPrixNb.innerHTML = _farm.getCost();
    element.appendChild(pPrixNb);

    pBpsTxt.innerHTML = 'BPS: ';
    element.appendChild(pBpsTxt);

    pBpsNb.id = _farm.id + 'Bps';
    pBpsNb.classList.add('tag');
    pBpsNb.innerHTML = _farm.getBps();
    element.appendChild(pBpsNb);

    document.getElementById('farms').appendChild(element);
}

function refreshFarmElements(){
    for (let farm of farmTab){
        document.getElementById(farm.id + 'Nb').innerHTML = 'x ' + farm.numberOf;
        document.getElementById(farm.id + 'Prix').innerHTML = farm.getCost();
        document.getElementById(farm.id + 'Bps').innerHTML = farm.getBps();
    }
}

function getGlobalBps(){
    let retour = 0;
    for (let farm of farmTab){
        retour += farm.getBps();
    }
    return retour;
}

function sauvegarder(){
    let farmTabNb = [];

    for (let farm of farmTab){
        farmTabNb.push(farm.numberOf);
    }

    const sauvegarde = {
        babanes: babanes,
        farmTabNb: farmTabNb
    };
    localStorage.setItem('sauvegarde', JSON.stringify(sauvegarde));
}

function charger(){
    const sauvegarde = localStorage.getItem('sauvegarde');

    if (sauvegarde){
        const chargement = JSON.parse(sauvegarde);
        babanes = chargement.babanes;
        let farmTabNb = chargement.farmTabNb;

        if (farmTabNb){
           for (let i = 0; i < farmTabNb.length; i++){
                farmTab.push(new Farm(farmsProps[i]))
                farmTab[farmTab.length - 1].numberOf = farmTabNb[i];
            } 
        }
        

    }
}

function startingRoutine(){
    charger();
    if (farmTab.length == 0){
        farmTab.push(new Farm(farmsProps[0]));
        elementForFarm(farmTab[0]);
    } else {
        for (let farm of farmTab){
            elementForFarm(farm);
        }
    }
}