
window.addEventListener('load', function(){
    let selectDay = document.getElementById('jour');
    let selectYear = document.getElementById('annee');
    let currentYear = new Date().getFullYear();

    for (let i = 0; i <= 31; i++){
        let option = document.createElement('option');
        if (i == 0){
            option.value = 'unselected';
            option.text = 'Choisissez votre jour';
        } else {
            option.value = i;
            option.text = i;
        }
        
        selectDay.appendChild(option);
    }

    for (let i = currentYear; i >= 1900; i--){
        let option = document.createElement('option');
        option.value = i;
        option.text = i;
        selectYear.appendChild(option);
    }

    for (let element of document.getElementsByClassName('formElement')){
        if (element.id == 'firstname' ||
        element.id == 'uname' ||
        element.id == 'jour' ||
        element.id == 'mois') {
            element.addEventListener('change', function(){
                document.getElementById('pseudo').value = calculerPseudo()
            });
        }

        element.addEventListener('change', function(){
          document.getElementById('submit').disabled = !formOk();
        });
    }


});

document.getElementById('submit').addEventListener('click', function(){

    for (let element of document.getElementsByClassName('formElement')){
        addCookie(element.name, element.value);
    }

    addCookie('jourAvantAnniv', nbJoursAnniv(document.getElementById('jour').value, document.getElementById('mois').value));

    window.location.href = './Accueil.html';
});
