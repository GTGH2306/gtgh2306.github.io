window.addEventListener('load', function(){
    let tableau  = document.getElementById('tableCookie');
    let lignes = [];
    const cookiesTab = getCookiesTab();

    for (let i = 0; i < cookiesTab.length; i++){
        let ligne = document.createElement('tr');
        let nomCookie = document.createElement('td');
        let valCookie = document.createElement('td');

        nomCookie.innerHTML = cookiesTab[i][0];
        valCookie.innerHTML = cookiesTab[i][1];


        ligne.appendChild(nomCookie);
        ligne.appendChild(valCookie);

        lignes.push(ligne);
    }

    for (let ligne of lignes){
        tableau.appendChild(ligne);
    }


});