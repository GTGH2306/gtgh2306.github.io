let rgb = ['A2', 'B7', 'CC'];
let baseActuel;

const Base = {
    DECIMAL : 10,
    HEXADECIMAL : 16
}

document.addEventListener("DOMContentLoaded", function(){
    baseActuel = Base.HEXADECIMAL;
    for (let field of document.getElementsByClassName('field')){
        field.addEventListener('change', function(){
            let redValue = document.getElementById('redValue');
            let greenValue = document.getElementById('greenValue');
            let blueValue = document.getElementById('blueValue');

            rgb[0] = checkValue(redValue.value.toString());
            rgb[1] = checkValue(greenValue.value.toString());
            rgb[2] = checkValue(blueValue.value.toString());
            setColor(rgb);
            refreshFields();
        })
    }
    setColor(rgb);
    refreshFields();
});

document.getElementById('redButton').addEventListener("click", function(){
    switch (baseActuel){
        case Base.DECIMAL:
            rgb = [255, 0, 0];
            break;
        case Base.HEXADECIMAL:
            rgb = ['FF', '00', '00']
            break;
    }
    refreshFields();
    setColor(rgb);
});

document.getElementById('greenButton').addEventListener("click", function(){
    switch (baseActuel){
        case Base.DECIMAL:
            rgb = [0, 255, 0];
            break;
        case Base.HEXADECIMAL:
            rgb = ['00', 'FF', '00']
            break;
    }
    refreshFields();
    setColor(rgb);
});

document.getElementById('blueButton').addEventListener("click", function(){
    switch (baseActuel){
        case Base.DECIMAL:
            rgb = [0, 0, 255];
            break;
        case Base.HEXADECIMAL:
            rgb = ['00', '00', 'FF']
            break;
    }
    refreshFields();
    setColor(rgb);
});

document.getElementById('hexRadio').addEventListener('click', function(){
    if (baseActuel == Base.DECIMAL){
        baseActuel = Base.HEXADECIMAL;
        rgb = decToHex(rgb);
    }
    refreshFields();
});

document.getElementById('decRadio').addEventListener('click', function(){
    if (baseActuel == Base.HEXADECIMAL){
        baseActuel = Base.DECIMAL;
        rgb = hexToDec(rgb);
    }
    refreshFields();
});

function setColor(_value) {
    document.body.style.backgroundColor = command(rgb);
}

function refreshFields(){
    let red = document.getElementById('redValue');
    let green = document.getElementById('greenValue');
    let blue = document.getElementById('blueValue');

    red.value = rgb[0];
    green.value = rgb[1];
    blue.value = rgb[2];
}

function command(_value){
    let retour;

    switch (baseActuel){
        case Base.DECIMAL:
            retour = 'rgb(' + checkValue(rgb[0]) + ',' + checkValue(rgb[1]) + ',' + checkValue(rgb[2]) + ')';
            break;
        case Base.HEXADECIMAL:
            retour = '#' + checkValue(rgb[0]) + checkValue(rgb[1]) + checkValue(rgb[2]);
            break;
    }
    return retour;
}

function checkValue(_value){
    let retour;
    switch (baseActuel){
        case Base.DECIMAL:
            _value = (isNaN(parseInt(_value)))?0:parseInt(_value);
            retour = (_value < 0 || _value > 255)?0:_value;
            break;
        case Base.HEXADECIMAL:
            let valide = true;
            if (_value.length == 0 || _value.length > 2){
                valide = false;
            } else if (_value.length == 1){
                _value = '0' + _value.toString();
            }

            for (let caracter of _value){
                if (!((caracter >= 0 && caracter <= 9) || caracter.match(/[A-F]/i))){
                    valide = false
                }
            }

            if (!valide){
                retour = '00';
            } else {
                retour = _value;
            }
            break;
    }
    return retour;
}

function decToHex(_value){
    let retour = [0, 0, 0];
    for (let i = 0; i < _value.length; i++){
        retour[i] = _value[i].toString(16).toUpperCase();
        retour[i] = (retour[i].length == 1)? '0'.toString() + retour[i]:retour[i];
    }
    return retour;
}

function hexToDec(_value){
    let retour = [0, 0, 0];
    for (let i = 0; i < _value.length; i++){
        retour[i] = parseInt(_value[i], 16);
    }
    return retour;

}