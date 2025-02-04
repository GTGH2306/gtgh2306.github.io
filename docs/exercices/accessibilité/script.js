const parameters = {
    contrast: 'default',
    font: 'default',
    interline: 'default',
    justify: 'default',
    images: 'default'
}

window.addEventListener('load', function() {
    setRadios();
});

document.getElementById('paramsButton').addEventListener('click', function(){
    document.getElementById('paramsOverlay').style.display = 'inline';
});

document.getElementById('closeParams').addEventListener('click', function(){
    document.getElementById('paramsOverlay').style.display = 'none';
});


function setTheme(_theme){
    setButtonsTheme(_theme);
    for (const className of document.body.classList){
        if (className.endsWith('Theme')){
            document.body.classList.remove(className);
        }
    }
    document.body.classList.add(_theme)
}

function setButtonsTheme(_theme) {
    if (_theme === 'defaultTheme') { 
        for (const input of document.getElementsByTagName('input')) {
            if (input.classList.contains('themedButtons')){
                input.classList.remove('themedButtons');
            }
        }
    } else {
        for (const input of document.getElementsByTagName('input')) {
            if (input.type === 'button' || input.type === 'submit'){
                input.classList.add('themedButtons');
            }
        }
    }
}

function setFont(_font){
    for (const className of document.body.classList){
        if (className.endsWith('Font')){
            document.body.classList.remove(className);
        }
    }
    document.body.classList.add(_font)
}

function setRadios(){
    for (const input of document.getElementById('params').getElementsByTagName('input')){
        if (input.type === 'radio'){
            if (input.value.endsWith('Theme')){
                input.addEventListener('click', function(){
                    setTheme(input.value);
                });
            } else if (input.value.endsWith('Font')) {
                input.addEventListener('click', function(){
                    setFont(input.value);
                });
            }
        }
    }
}