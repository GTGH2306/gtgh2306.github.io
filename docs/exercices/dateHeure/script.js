
document.addEventListener("DOMContentLoaded", function() {
    setInterval('applyDateHour()', 1000)
});



function applyDateHour(){
    applyDate();
    applyHour();
}

function returnDate(){
    const currentDate = new Date();
    let retour = '';
    retour += twoDigit(currentDate.getDate()) + '/' + twoDigit((currentDate.getMonth() + 1)) + '/' + currentDate.getFullYear()
    return retour;
}

function returnHour(){
    const currentDate = new Date();
    let retour ='';
    retour += twoDigit(currentDate.getHours()) + ":" + twoDigit(currentDate.getMinutes()) + ":" + twoDigit(currentDate.getSeconds());
    return retour;
}

function twoDigit(_value){
    let retour = '';
    retour += (_value < 10)?'0' + _value:_value;
    return retour;
}

function applyDate(){
    let champ = document.getElementById('date');
    champ.value = returnDate();
}

function applyHour(){
    let champ = document.getElementById('heure');
    champ.value = returnHour();
}