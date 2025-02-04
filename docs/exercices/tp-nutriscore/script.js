let cereals;
let shownTable;
const checkboxes = [
    document.getElementById('nutriA'),
    document.getElementById('nutriB'),
    document.getElementById('nutriC'),
    document.getElementById('nutriD'),
    document.getElementById('nutriE')
]

window.addEventListener('load', function(){

    for (const checkbox of checkboxes){
        checkbox.addEventListener('change', function(){
            tableManager()
        });
    }

    fetch('https://arfp.github.io/tp/web/javascript2/10-cereals/cereals.json')
    .then(function(_response){
        return _response.json()
    }).then(function(_results){
        let i = 0;
        cereals = _results.data;
        tableManager();
        for (const key in cereals[0]){
            document.getElementsByTagName('a')[i].addEventListener('click', function(){
                cereals = sortByKey(cereals, key);
                tableManager();
            });
            i++;  
        }
        document.getElementById('nsHead').addEventListener('click', function(){
            cereals = sortByKey(cereals, 'rating');
            tableManager();
        });
    })
});

document.getElementById('searchSelect').addEventListener('change', function(){
    tableManager();
});

document.getElementById('search').addEventListener('input', function(){
    tableManager();
});

function tableManager(){
    let tableToShow;
    if(document.getElementById('search').value.length > 1){
        tableToShow = searchInCereals(cereals, document.getElementById('search').value);
    } else {
        tableToShow = cereals;
    }

    tableToShow = nutriCereals(tableToShow);

    switch(document.getElementById('searchSelect').value){
        case 'Tous':
            showTable(tableToShow);
        break;
        case 'Sans sucre':
            tableToShow = cerealsNoSugar(tableToShow);
            showTable(tableToShow);
        break;
        case 'Pauvre en sel':
            tableToShow = cerealsLowSalt(tableToShow);
            showTable(tableToShow);
        break;
        case 'Boost':
            tableToShow = cerealsBoost(tableToShow);
            showTable(tableToShow);
        break;
    }
    shownTable = tableToShow;


    if (document.getElementById('tableFoot')){
        document.getElementById('tableFoot').remove()
    }

    const footer = document.createElement('tr');
    footer.id = 'tableFoot';
    footer.appendChild(document.createElement('td'));
    const nbElements = document.createElement('td');
    nbElements.textContent = shownTable.length + ' éléments';
    nbElements.classList.add('tableName')
    footer.appendChild(nbElements);
    const avgCaloriesTable = document.createElement('td')
    avgCaloriesTable.textContent = 'Moyenne calories ' + Math.round(avgCalories(shownTable));
    footer.appendChild(avgCaloriesTable);
    document.getElementById('resultsFoot').appendChild(footer);

}

function showTable(_cereals){
    while (document.getElementsByClassName('line').length > 0){
        document.getElementsByClassName('line')[0].remove()
    }

    for (const cereal of _cereals){
        const line = document.createElement('tr');
        const id = document.createElement('td');
        const name = document.createElement('td');
        const calories = document.createElement('td');
        const proteins = document.createElement('td');
        const salt = document.createElement('td');
        const fibers = document.createElement('td');
        const carbo = document.createElement('td');
        const sugar = document.createElement('td');
        const potassium = document.createElement('td');
        const vitamins = document.createElement('td');
        const rating = document.createElement('td');
        const ns = document.createElement('td');
        const del = document.createElement('td');
        const delButton = document.createElement('input');

        id.textContent = cereal.id;
        name.textContent = cereal.name;
        name.classList.add('tableName');
        calories.textContent = cereal.calories;
        proteins.textContent = cereal.protein;
        salt.textContent = cereal.sodium;
        fibers.textContent = cereal.fiber;
        carbo.textContent = cereal.carbo;
        sugar.textContent = cereal.sugars;
        potassium.textContent = cereal.potass;
        vitamins.textContent = cereal.vitamins;
        rating.textContent = cereal.rating;
        
        if(cereal.rating > 80){
            ns.textContent = 'A';
            ns.classList.add('nutriA');
        } else if(cereal.rating > 70){
            ns.textContent = 'B';
            ns.classList.add('nutriB');
        } else if (cereal.rating > 55){
            ns.textContent = 'C';
            ns.classList.add('nutriC');
        } else if (cereal.rating > 35){
            ns.textContent = 'D'
            ns.classList.add('nutriD');
        } else {
            ns.textContent = 'E';
            ns.classList.add('nutriE');
        }

        delButton.type = 'button';
        delButton.value = '❌';
        delButton.classList.add('deleteButton');
        delButton.addEventListener('click', function(){
            delButton.parentElement.parentElement.remove();
            cereals.splice(cereals.indexOf(cereal),1);
            tableManager();
        });

        del.appendChild(delButton);

        line.appendChild(id);
        line.appendChild(name);
        line.appendChild(calories);
        line.appendChild(proteins);
        line.appendChild(salt);
        line.appendChild(fibers);
        line.appendChild(carbo);
        line.appendChild(sugar);
        line.appendChild(potassium);
        line.appendChild(vitamins);
        line.appendChild(rating);
        line.appendChild(ns);
        line.appendChild(del);
        line.classList.add('line')

        document.getElementById('results').appendChild(line);
    }
}

function cerealsNoSugar(_cereals){
    const cerealsNoSugar = [];

    for (const cereal of _cereals){
        if(cereal.sugars < 1){
            cerealsNoSugar.push(cereal);
        }
    }
    return cerealsNoSugar;
}

function cerealsLowSalt(_cereals){
    const cerealsLowSalt = [];

    for (const cereal of _cereals){
        if(cereal.sodium < 50){
            cerealsLowSalt.push(cereal);
        }
    }
    return cerealsLowSalt;
}

function cerealsBoost(_cereals){
    const cerealsBoost = [];

    for (const cereal of _cereals){
        if(cereal.vitamins >= 25 && cereal.fiber >= 10){
            cerealsBoost.push(cereal);
        }
    }
    return cerealsBoost;
}

function getNs(_rate){
    if(_rate > 80){
        return 'A'
    } else if(_rate > 70){
        return 'B'
    } else if (_rate > 55){
        return 'C'
    } else if (_rate > 35){
        return 'D'
    } else {
        return 'E'
    }
}

function nutriCereals(_cereals){
    const rateToHide = []
    const nutriCereals = [];

    for (const checkbox of checkboxes){
        if (checkbox.checked === false && !areAllUnchecked()){
            rateToHide.push(checkbox.id);
        }
    }

    for (const cereal of _cereals){
        if (rateToHide.indexOf('nutri' + getNs(cereal.rating)) < 0){
            nutriCereals.push(cereal);   
        }
    }
    return nutriCereals;
}

function areAllUnchecked(){
    let areAllUnchecked = true;

    for (const checkbox of checkboxes){
        if (checkbox.checked === true){
            areAllUnchecked = false;
        }
    }
    return areAllUnchecked;
}

function avgCalories(_cereals){
    let caloriesTotal = 0;
    for(let cereal of _cereals){
        caloriesTotal += cereal.calories;
    }

    return caloriesTotal / _cereals.length;
}

function searchInCereals(_cereals, _search){
    const tableSearched = [];
    for (const cereal of _cereals){
        if (cereal.name.toLowerCase().includes(_search.toLowerCase())){
            tableSearched.push(cereal);
        }
    }
    return tableSearched;
}

function sortByKey(_cereals, _key){
    if (typeof(_cereals[0][_key]) !== 'string'){
        if (JSON.stringify(_cereals) === JSON.stringify(_cereals.sort((a, b) => a[_key] - b[_key]))){
            return _cereals.sort(function(a, b){
                return b[_key] - a[_key]
            });
        } else {
            return _cereals.sort(function(a, b){
                return a[_key] - b[_key]
            });
        }
    } else {
        if (JSON.stringify(_cereals) === JSON.stringify(_cereals.sort((a, b) => (a[_key] < b[_key])?1:-1))){
            return _cereals.sort((a, b) => (a[_key] > b[_key])?1:-1);
        } else {
            return _cereals.sort((a, b) => (a[_key] < b[_key])?1:-1)
        }
    }
}