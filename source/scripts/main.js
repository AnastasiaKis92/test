import data from './data.json' assert {type: 'json'};
import flatpickr from 'flatpickr';


const circleButton = document.querySelector('.page__circle');
const markSelect = document.getElementById('mark');
const modelSelect = document.getElementById('model');
const yearSelect = document.getElementById('year');
const form = document.querySelector('.auto__form');
const deliveryButton = document.querySelector('.auto__delivery');
const date = document.querySelector('.auto__date');

modelSelect.innerHTML = `<option value=''>Модель</option>`;
yearSelect.innerHTML = `<option value=''>Год</option>`;
markSelect.innerHTML = `<option value=''>Марка</option>`;

// Calendar
const addCalendar = (min, max) => {
  flatpickr(document.getElementById('calendar'), {
    dateFormat: 'd.m.Y',
    minDate: min,
    maxDate: max,
    disableMobile: 'true',
  });
};

const clickCircleButton = () => {
  circleButton.addEventListener('click', () => {
  form.classList.add('active');
  })
}

setTimeout(clickCircleButton, 4500);


const markArray = [];

const makeUniq = (arr) => {
  return arr.filter((el, id) => arr.indexOf(el) === id);
}


data.forEach((item) => {
  markArray.push(item.mark);
});

const marks = makeUniq(markArray);

for (let i = 0; i < marks.length; i++) {
  markSelect.innerHTML += `<option value=${marks[i]}>${marks[i]}</option>`;
}

// Выбор марки
markSelect.addEventListener('change', (evt) => {
  const modelArray = [];

  for (let i = 0; i < data.length; i++) {
    if(data[i].mark === evt.target.value) {
      modelArray.push(data[i].model);
    }
  }

  const models = makeUniq(modelArray);

  modelSelect.innerHTML = `<option value=''>Модель</option>`;
  yearSelect.innerHTML = `<option value=''>Год</option>`;

  for (let i = 0; i < models.length; i++) {
    modelSelect.innerHTML += `<option value=${models[i]}>${models[i]}</option>`;
  }
});

// Выбор года выпуска в зависимости от модели
modelSelect.addEventListener('change', (evt) => {
  const yearArray = [];

  for (let i = 0; i < data.length; i++) {
    if(data[i].model === evt.target.value) {
      yearArray.push(data[i].year);
    }
  }

  const years = makeUniq(yearArray);
  yearSelect.innerHTML = `<option value=''>Год</option>`;
  for (let i = 0; i < years.length; i++) {
    yearSelect.innerHTML += `<option value=${years[i]}>${years[i]}</option>`;
  }
});

// Выбор даты доставки после выбора года выпуска
yearSelect.addEventListener('change', (evt) => {
  const deliveryArray = [];
  for (let i = 0; i < data.length; i++) {

    if(data[i].year === evt.target.value) {
      deliveryArray.push(data[i].delivery.split('-'));

      for (let j = 0; j < deliveryArray.length; j++) {
        const newArray = [].concat(deliveryArray[0], deliveryArray[j]);
        console.log(newArray);
        addCalendar(newArray[0], newArray[1]);
      }

    }
  }
})

// Появление кнопки доставка, если заполнены все поля
form.addEventListener('change', () => {
  if (markSelect.value !== '' && modelSelect.value !== '' && yearSelect.value !== '') {
    deliveryButton.classList.add('active');
  } else {
    deliveryButton.classList.remove('active');
  }
});

// Появление календаря
deliveryButton.addEventListener('click', () => {
  date.classList.add('active');
  date.style.opacity = '1';
});
