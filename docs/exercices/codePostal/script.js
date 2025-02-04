let villes;

window.addEventListener('load', function(){
    fetch('https://arfp.github.io/tp/web/javascript/02-zipcodes/zipcodes.json')
    .then(function(_response) {
        return _response.json();
    }).then(function(_results){
        villes = _results
        creerDatalistVilles(_results)
    });
});

document.getElementById('confirmer').addEventListener('click', function(){
    afficherRecherche();
});

function creerDatalistVilles(_villes){
    const parent = document.getElementById('liste-ville');
    for (const ville of _villes){
        const option = document.createElement('option');
        option.value = ville.codePostal + ' ' + ville.nomCommune;
        parent.appendChild(option);
    }
}


function afficherRecherche(){
    let input = document.getElementById('choix-ville').value;
    input = input.replace(' ', '#');
    input = input.split('#');

    villesParNom = villes.filter((ville) => ville.nomCommune === input[1]); 

    for (const ville of villesParNom){
        if (ville.codePostal === input[0]){
            document.getElementById('nom-ville').textContent = ville.nomCommune;
            document.getElementById('code-postal').textContent = ville.codePostal;
            document.getElementById('code-commune').textContent = ville.codeCommune;
            document.getElementById('libelle-acheminement').textContent = ville.libelleAcheminement;
        }
    }

    // for (const ville of villes){
    //     console.log(input.value);
    //     console.log(input.textContent);
    //     if (ville.codePostal === input[0] && ville.nomCommune === input[1]){
    //         document.getElementById('nom-ville').textContent = ville.nomCommune;
    //         document.getElementById('code-postal').textContent = ville.codePostal;
    //         document.getElementById('code-commune').textContent = ville.codeCommune;
    //         document.getElementById('libelle-acheminement').textContent = ville.libelleAcheminement;
    //     }
    // }
}

