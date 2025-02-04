
let response;

window.addEventListener('load', function(){
    getResponse().then(data => {
        response = data;
        createHtmlElement(response)
        showMostPlayed(response)
        showBestRatio(response)
    })

    
});

async function getResponse(){
    let retour;
    retour = await fetch('https://arfp.github.io/tp/web/javascript/03-cardgame/cardgame.json')
    retour = await retour.json();
    return retour;
}

function createHtmlElement(_response) {

    let firstLine = document.createElement('tr')
    let keys = [];

    for (let card of _response){
        for (let key in card){
            if (!keys.includes(key)){
                keys.push(key);
            }
        }
    }

    for (let key of keys){
        let line = document.createElement('th');
        line.textContent = key;
        firstLine.appendChild(line);
    }
    document.getElementById('tableau').appendChild(firstLine);

    for (let card of _response){
        let newLine = document.createElement('tr');
        for (let i = 0; i < keys.length; i++){
            let value = document.createElement('td')
            if (card[keys[i]] !== undefined){
                value.innerHTML = card[keys[i]]
            }
            newLine.appendChild(value);
        }
        document.getElementById('tableau').appendChild(newLine);
    }
}

function showMostPlayed(_cards){
    const mostPlayedElement = document.getElementById('mostPlayed');
    let mostPlayedIndex;
    let maxPlayed;
    
    for (let i = 0; i < _cards.length; i++){
        if (_cards[i].played > maxPlayed || maxPlayed === undefined){
            mostPlayedIndex = i;
            maxPlayed =_cards[i].played;
        }
    }

    mostPlayedElement.innerHTML = 'Carte la plus jouée: ' + _cards[mostPlayedIndex].name + ' avec ' + _cards[mostPlayedIndex].victory + ' victoires.';

}

function showBestRatio(_cards){
    const bestRatioElement = document.getElementById('bestRatio');
    let bestRatioIndex;
    let bestRatio;
    
    for (let i = 0; i < _cards.length; i++){
        let ratio = _cards[i].victory / _cards[i].defeat;

        if (ratio > bestRatio || bestRatio === undefined){
            bestRatioIndex = i;
            bestRatio = ratio;
        }
    }

    bestRatioElement.innerHTML = 'Carte avec le meilleur ratio: ' + _cards[bestRatioIndex].name + ' avec ' + _cards[bestRatioIndex].victory + ' victoires sur ' + _cards[bestRatioIndex].played + ' parties.';

}