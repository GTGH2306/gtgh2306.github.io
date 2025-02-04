var colorHex;

function setColor(){
    let fond = document.getElementById('bloc');
    fond.style.backgroundColor = colorHex;
}

function getValues(){
    let red = document.getElementById('redValue').value;
    let green = document.getElementById('greenValue').value;
    let blue = document.getElementById('blueValue').value;
    let rgb = [red, green, blue];

    for (let i = 0; i < rgb.length; i ++) {
        rgb[i] = returnCorrectValue(rgb[i]);
    }
    applyValues(rgb);
}

function applyValues(_values){
    let hex = '#'
    for (let i = 0; i < _values.length; i++){
        hex += _values[i];
    }
    colorHex = hex;
    setColor();
    refreshValues();
}

function returnCorrectValue(_value){
    let retour ='';
    let valide = true;

    if (_value.length == 1 || _value.length == 2){
        for (let i = 0; i < _value.length; i++){
            if ((_value[i] >= 0 && _value[i] <= 9) || _value[i].match(/[A-F]/i)){
                retour += _value[i];
            } else {
                valide = false;
            }
            if(_value.length == 1 && valide){
                _value = '0' + _value;
            }
        }
    } else if (_value >= 0 && _value <= 255) {
        retour = parseInt(_value, 10);
        retour = retour.toString(16);
    } else {
        valide = false;
    }

    if (!valide){
        retour = '00';
    }
    return retour;
}

function refreshValues(){
    let red = document.getElementById('redValue');
    let green = document.getElementById('greenValue');
    let blue = document.getElementById('blueValue');

    red.value = colorHex[1] + colorHex[2];
    green.value = colorHex[3] + colorHex[4];
    blue.value = colorHex[5] + colorHex[6];
}
