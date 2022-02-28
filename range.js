const minGap = 0;
const rangeZone = document.querySelector('.form__secondary');
const allSliders = document.querySelectorAll('[type="range"]');
const allOutputTextFields = document.querySelectorAll('[type="text"]');
const sliderTracks = document.querySelectorAll('.slider-track');

//стартовое заполнение полей, с учетом min/max
allSliders.forEach( function(item, index) {
    if (index == 0){
        allOutputTextFields[index].value = item.min;
    }
    else{
        //нечетный элемент 1,3,5,7
        if (index % 2 != 0)
        {
            allOutputTextFields[index].value = item.max;
        }
        //четный элемент 2,4,6,8
        else {
            allOutputTextFields[index].value = item.min;
        }
    }
});

//стартовое заполнение трекеров, с учетом min/max
let arrMinValues = [];
let arrMaxValues = [];

allSliders.forEach( function(item, index) {
    if (index == 0){
        arrMinValues.push((item.min / item.max) * 100);
    }
    else{
        //нечетный элемент 1,3,5,7
        if (index % 2 != 0)
        {
            arrMaxValues.push((item.max / item.max) * 100);
        }
        //четный элемент 2,4,6,8
        else {
            arrMinValues.push((item.min / item.max) * 100);
        }
    }
});

/*
sliderTracks.forEach( function(item, index) {
    item.style.background = `linear-gradient(to right, #dadae5 ${arrMinValues[index]}% , #3264fe ${arrMinValues[index]}% , #3264fe ${arrMaxValues[index]}%, #dadae5 ${arrMaxValues[index]}%)`;
});*/

sliderTracks.forEach( function(item, index) {
    item.style.background = "#0F74D1";
});


let sliderLeft;
let sliderRight;
let displayValLeft;
let displayValRight;
let sliderMaxValue;

rangeZone.oninput = function(event) {
    //слайдер, на который ткнули
    let slider = event.target;

    //id слайдера на какой слайдер ткнули
    let sliderId = slider.id;
    let splitTargetIdSlider = sliderId.split('-');
    //номер этого слайдера
    let numTargetSlider = splitTargetIdSlider[1];
    
    //максимально допустимое значение слайдера
    sliderMaxValue = slider.max;

    let numTrack;//номер трека

    //присвоили левый и правый слайдеры
    //нечетный слайдер 1,3,5,7
    if (parseInt(numTargetSlider) % 2 != 0)
    {
        sliderLeft = slider;
        sliderRight = allSliders[numTargetSlider];
        numTrack = (numTargetSlider / 2) - 0.5;//номер трека 0,1,2,..
    }
    //четный слайдер 2,4,6,8
    else {
        sliderRight = slider;
        sliderLeft = allSliders[numTargetSlider-2];
        numTrack = (numTargetSlider / 2) - 1;//номер трека 0,1,2,..
    }

    //остановили движение каретки
    if(parseInt(sliderRight.value) - parseInt(sliderLeft.value) <= minGap  && slider === sliderLeft){
        sliderLeft.value = parseInt(sliderRight.value) - minGap;
    }
    if(parseInt(sliderRight.value) - parseInt(sliderLeft.value) <= minGap && slider === sliderRight){
        sliderRight.value = parseInt(sliderLeft.value) + minGap;
    }

    //вписали значение в соответствующий текстовый инпут
    allOutputTextFields[numTargetSlider-1].value = event.target.value;
    
    //закрасили трек слайдера
    let percentLeft = (sliderLeft.value / sliderMaxValue) * 100;
    let percentRight = (sliderRight.value / sliderMaxValue) * 100;

    console.log(numTrack)
    sliderTracks[numTrack].style.background = `linear-gradient(to right, #dadae5 ${percentLeft}% , #0F74D1 ${percentLeft}% , #0F74D1 ${percentRight}%, #dadae5 ${percentRight}%)`;
};






/*
Было:

window.onload = function(){
    slideOne();
    slideTwo();
}

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;

function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.value = sliderOne.value;
    fillColor();
}

function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.value = sliderTwo.value;
    fillColor();
}

function fillColor(){
    percent1 = (sliderOne.value / sliderMaxValue) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
}

*/

