let data;
let firstParticipant;

window.addEventListener('load', function(){
    fetch('resultat10000metres.json')
    .then(function(_results){
        return _results.json();
    }).then(function(_json){
        data = _json;
        loadInfos(data);
        loadTableFromData(data);
        createCheckboxes();
    });
});

function loadTableFromData(_data){
    _data.sort(function(a, b){return a.temps - b.temps});

    while(document.querySelector('#results').children.length > 0){
        document.querySelector('#results').children[0].remove();
    }

    for (const _participant of _data){
        document.querySelector('#results')
        .appendChild(getRowFromParticipant(_participant));
    }
}

function getRowFromParticipant(_participant){
    const row = document.createElement('tr')
    const name = _participant.nom.split(' ')
    
    row.insertCell().textContent = _participant.pays;
    row.insertCell().textContent = name[0];
    row.insertCell().textContent = name[1];
    row.insertCell().textContent = timeInSecToString(_participant.temps);
    row.insertCell().textContent = '+' + (_participant.temps - firstParticipant.temps) + 's'

    return row;
}

function timeInSecToString(_time) {
    let hours = 0;
    let minutes = 0;
    let retour = '';

    hours = Math.floor(_time / 3600);
    _time -= hours * 3600;
    minutes = Math.floor(_time / 60);
    _time -= minutes * 60;

    if (hours > 0) {
        retour += hours + 'h';
    }
    if (hours > 0 || minutes > 0) {
        retour += minutes + 'm';
    }
    if (_time < 10){
        _time = '0' + _time;
    }
    retour += _time + 's'
    
    return retour;
}

function createCheckboxes(){
    const parent = document.getElementById('countryFilter');
    const countries = [];

    for (const _participant of data){
        if (!countries.includes(_participant.pays)) {
            countries.push(_participant.pays);
        }
    }
    countries.sort();

    for (const _country of countries) {
        const div = document.createElement('div');
        const checkbox = document.createElement('input');
        const label = document.createElement('label');

        div.classList.add('countryCheckbox')
        checkbox.name = _country.toLowerCase();
        checkbox.type = 'checkbox';
        label.textContent = _country;
        label.setAttribute('for', _country.toLowerCase());

        div.appendChild(checkbox);
        div.appendChild(label);
        parent.appendChild(div);

        checkbox.addEventListener('change', function() {
            loadTableFromData(getDataFilteredByCountry(data))
        });
    }
}

function getCountriesFiltered() {
    const countries = []
    for (const _div of document.querySelectorAll('.countryCheckbox')){
        const isChecked = _div.children[0].checked;
        const country = _div.children[1].textContent;
        if (isChecked){
            countries.push(country);
        }
    }
    if (countries.length === 0){
        for (const _participant of data){
            if (!countries.includes(_participant.pays)) {
                countries.push(_participant.pays);
            }
        }
    }
    return countries;
}

function getDataFilteredByCountry(_data) {
    const countriesFiltered = getCountriesFiltered();
    const dataFiltered = [];
    for (const _participant of _data) {
        if (countriesFiltered.includes(_participant.pays)) {
            dataFiltered.push(_participant);
        }
    }
    return dataFiltered;
}

function loadInfos(_data){
    firstParticipant = null;

    for (const _participant of _data){
        if (firstParticipant === null || firstParticipant.temps > _participant.temps){
            firstParticipant = _participant;
        }
    }

    document.querySelector('#countParticipants').textContent =
        _data.length + ' participants';
    document.querySelector('#winner').textContent = 'Gagnant : ' +
        firstParticipant.nom.split(' ')[1] + ' ' + firstParticipant.nom.split(' ')[0]
}