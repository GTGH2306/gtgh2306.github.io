let slides;
const obligatoryForms = [
    document.getElementById('formName'),
    document.getElementById('formPhone'),
    document.getElementById('formMail')
]



window.addEventListener('load', function(){
    fetch('./carousel.json')
    .then(function(_response){
        return _response.json();
    }).then(function(_results){
        slides = _results;
        createCarousel();
    })
});

document.getElementById('formSubmit').addEventListener('click', function(){
    if (formIsValid()){

    } else {
        new bootstrap.Modal(document.getElementById('staticBackdrop')).show();
    }
})

function createCarousel(){
    for (const slide of slides){
        const items = slideFromJson(slide);
        document.getElementById('carIndicsFond').appendChild(items[0]);
        document.getElementById('carInnersFond').appendChild(items[1]);
    }
}


function slideFromJson(_slide){
    const carButton = document.createElement('button');
    const carItem = document.createElement('div');
    const carImg = document.createElement('img');
    const carCaption = document.createElement('div');
    const capTitle = document.createElement('h5');
    const capText = document.createElement('p');

    carButton.setAttribute('type', 'button');
    carButton.setAttribute('data-bs-target', '#carouselFond');
    carButton.setAttribute('data-bs-slide-to', _slide.id - 1);
    carButton.setAttribute('aria-label', 'Slide ' + (_slide.id + 1));
    
    carItem.classList.add('carousel-item');
    
    carImg.setAttribute('src', './img_slider_modif/fond' + _slide.id + '.jpg');
    carImg.setAttribute('alt', '');
    carImg.classList.add('d-block');
    carImg.classList.add('w-100');
    
    carCaption.classList.add('carousel-caption');
    carCaption.classList.add('d-none');
    carCaption.classList.add('d-md-block');

    capTitle.textContent = _slide.titre;
    capText.textContent = _slide.accroche;

    if (_slide.id - 1 === 0){
        carButton.classList.add('active');
        carButton.setAttribute('aria-current', 'true');
        carItem.classList.add('active')
    }
    carItem.appendChild(carImg);
    carItem.appendChild(carCaption);
    carCaption.appendChild(capTitle);
    carCaption.appendChild(capText);

    return [carButton, carItem];
}

function formIsValid(){
    let isValid = true;
    for (const formElement of obligatoryForms){
        if (formElement.value === ''){
            isValid = false;
        }
    }
    return isValid;
}