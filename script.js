const formMain = document.querySelector('.form__main');//вся форма
const partForm = document.querySelector('.form__secondary');//часть формы
const headerForm = document.querySelector('.form__header');
const footerForm = document.querySelector('.form__footer');

//разворачиватели блоков

//отслеживаем клик по заголовку

headerForm.addEventListener('click', function() {
  formMain.classList.toggle('fadeForm');
  headerForm.classList.toggle('fullRadius');
  headerForm.classList.toggle('topRadius');
  formMain.classList.toggle('footerRadius');
  footerForm.classList.toggle('footerRadius');
  
  let headerTick = document.querySelector('.form__header-header-tick');
  if (headerTick.style.transform == "rotate(0deg)")
  {
    headerTick.style.transform = "rotate(180deg)";
  }
  else {
    headerTick.style.transform = "rotate(0deg)";
  }
});



let allPage;//вся страница
let ffh = document.querySelector('.form__footer_header');//футер
let rangeZone = document.querySelector('.form__secondary');;//для нижней части формы со слайдерами
let allSliders;//все слайдеры
let allOutputTextFields;//все поля длы вывода чисел со слайдера
let sliderTracks;//все треки слайдеров
const minGap = 0;
let openHideBool = false;//проверяем открывается или закрывается форма
let jsonData;//получаем данные
let ff = document.querySelector('body');//вся страница
footerForm.addEventListener('click', function() {
  //открываем, закрываем форму
  partForm.classList.toggle('fadeForm');
  
  //проверяем открывается или закрывается форма
  openHideBool = !openHideBool;
  //получаем данные ajax и рендерим их, когда форма открывается
  if(openHideBool == true) {
    rangeZone.innerHTML = "";
    $.get("ajax.php",
      (data) => { 
        if (data) jsonData = JSON.parse(data); 
        let slideId = 0;
        let checkId = 0;
        for(var id = 0 in jsonData){
          if (jsonData[id].typeContentId == "1"){
              checkFormLoader(id, checkId);
              checkId++;
            }
          if (jsonData[id].typeContentId == "2"){
            rangeFormLoader(id, slideId);
            slideId++;
          }
        }
         startRanges();
         allPage = document.querySelector('body');//вся страница

         //меняем футер текст
         ffh.innerHTML = "Показать меньше параметров (4)";
    });
  }
  else{
    ffh.innerHTML = "Показать больше параметров (12)";
  }
});


//Чекбоксы

//закрыть, если нажали вне элемента
document.addEventListener( 'click', (e) => {
  let allCheckboxes = document.querySelectorAll('.multiselect');
  console.log(e.target);//куда реально тыкнули
  
  let withinChecks = e.composedPath().includes(allCheckboxes[1]);//true, если тыкнули на весь этот блок

  for (let i = 0; i < allCheckboxes.length; i++) {
    let withinChecks = e.composedPath().includes(allCheckboxes[i]);//true, если тыкнули на весь этот блок
    if ( ! withinChecks ){
      let checkBox = allCheckboxes[i];
      let checkClose = checkBox.firstElementChild.firstElementChild;
      let mulCheck = checkBox.lastElementChild;//multiselect__checkboxes
      console.log(mulCheck);
      checkClose.style.display = 'none';
      mulCheck.style.display = 'none';
    }
  }
});


formMain.onclick = function(event) {
  let targetCheckBox = event.target.closest('.multiselect__selectbox'); //возвращает ближайшего предка, соответствующего селектору
  // Если event.target не содержится внутри элемента 
  if (!formMain.contains(targetCheckBox)) return; 
  openCheck(targetCheckBox); // открываем/закрываем
};

function openCheck(targetCheckBox) {
  var checkboxes = targetCheckBox.nextElementSibling;
  var multiselect = checkboxes.parentNode;
  let allCheckboxes = document.querySelectorAll('.multiselect__checkboxes');
  let allMultiselect = document.querySelectorAll('.multiselect');
  let checkClose = document.querySelectorAll('.checkClose');
  for (let i = 0; i < allCheckboxes.length; i++) {
    //если прокручиваемый чекбокс равен кликнутому чербоксу
    if (allCheckboxes[i] === checkboxes){
    //если закрыт, то показать
      if (checkboxes.style.display == "none" || checkboxes.style.display == "") { 
        checkboxes.style.display = "block";
        multiselect.style.zIndex = 5;
        checkClose[i].style.display = "inline-block";
      }
      else{
        checkboxes.style.display = "none";
        checkClose[i].style.display = "none";
        multiselect.style.zIndex = 3;
      }
    }
    //закрыть все остальные
    else {
      allCheckboxes[i].style.display = "none";
      checkClose[i].style.display = "none";
      allMultiselect[i].style.zIndex = 3;
    }
  }
}

//для загрузки чекеров
function checkFormLoader(id, checkId)
{
    let upForm = '<div class="form__cell load__check"><div class="multiselect"><div class="multiselect__selectbox"><div class="checkClose"></div>';
    let hForm = '<select><option>' + jsonData[id].header + '</option></select>';
    let ovForm = '<div class="overSelect"></div></div><div class="multiselect__checkboxes">';
    let labelForm = "";
      for(var i = 0 in jsonData[id].checkboxes){
         labelForm = labelForm + '<label for="label'+ id + "-" + i + '"><input type="checkbox" id="label'+ id + "-" + i + '" /><span>' + jsonData[id].checkboxes[i] + '</span></label>';
      }
    let butForm = '<input type="button" name="button-check-'+ id +'" value="Применить">';
    let fForm = '</div></div></div>';
    let sliderToHtml = upForm + hForm + ovForm + labelForm + butForm + fForm;
    document.querySelector('.form__secondary').insertAdjacentHTML("beforeend", sliderToHtml);
}


//слайдеры-рейнджеры

            
function rangeFormLoader(id, slideId)
{
    let upForm = '<div class="form__cell load__range">';
    let hForm = '<div class="load__range-header">' + jsonData[id].header + '</div>';
    let contForm = '<div class="load__range_container">';
    let trackForm = '<div class="slider-track"></div>';
    let sl1Form = '<input type="range" min="' + jsonData[id].min + '" max="' + jsonData[id].max + '" value="0" id="slider-' + `${slideId*2+1}` + '">';
    let sl2Form = '<input type="range" min="' + jsonData[id].min + '" max="' + jsonData[id].max + '" value="' + jsonData[id].max + '" id="slider-' + `${slideId*2+2}` + '">';
    let rValForm = '</div><div class="load__range_values">';
    let inpText1Form = '<input type="text"><label class="beforeInpFrom"></label>';
    let inpText2Form = '<label class="beforeInpTo"></label><input type="text">';
    let fForm = '</div></div>';
    let sliderToHtml = upForm + hForm + contForm + trackForm + sl1Form + sl2Form + rValForm + inpText1Form + inpText2Form + fForm;
    document.querySelector('.form__secondary').insertAdjacentHTML("beforeend", sliderToHtml);
}


function startRanges()
{
allSliders = document.querySelectorAll('[type="range"]');
allOutputTextFields = document.querySelectorAll('[type="text"]');
sliderTracks = document.querySelectorAll('.slider-track');

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

}


let sliderLeft;
let sliderRight;
let displayValLeft;
let displayValRight;
let sliderMaxValue;

//изменяем значения, при изменении позиции слайдера
rangeZone.oninput = function(event) {

    //слайдер, на который ткнули
    let slider = event.target;

    if(slider.type != "range") return;

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

    sliderTracks[numTrack].style.background = `linear-gradient(to right, #dadae5 ${percentLeft}% , #0F74D1 ${percentLeft}% , #0F74D1 ${percentRight}%, #dadae5 ${percentRight}%)`;
};

