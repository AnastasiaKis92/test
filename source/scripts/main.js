import data from './data.json' assert {type: 'json'};
import flatpickr from 'flatpickr';
import { Russian } from "flatpickr/dist/l10n/ru.js";

const animContainer = document.querySelector('.anim');
const circleButton = animContainer.querySelector('.anim__circle');

const markSelect = document.getElementById('mark');
const modelSelect = document.getElementById('model');
const yearSelect = document.getElementById('year');

const form = document.querySelector('.auto__form');
const deliveryButton = form.querySelector('.auto__button');
const date = form.querySelector('.auto__date');
const againLink = document.querySelector('.auto__link');
const text = document.querySelector('.auto__text');
const textSpan = text.querySelectorAll('span');

const fragment = document.createDocumentFragment();

// Функция для очистки массива от повторяющихся значений
const makeUniq = (arr) => arr.filter((el, id) => arr.indexOf(el) === id);

// Функция создания списка в селекте
const makeList = (el, select) => {
  const newOption = document.createElement('option');
  newOption.value = el;
  newOption.textContent = el;
  fragment.append(newOption);
  select.append(fragment);
};

// Инициализация календаря
const addCalendar = (min, max) => {
  flatpickr(document.getElementById('calendar'), {
    dateFormat: 'd.m.Y',
    minDate: min,
    maxDate: max,
    disableMobile: 'true',
    inline: true,
    locale: Russian,
  });
};

// Появление календаря после нажатия на кнопку "Доставить"
deliveryButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  document.querySelector('.flatpickr-calendar').style.display = 'block';
});

// Появление кнопки "Нажать" после анимации квадратов
document.querySelector('.anim__square--1').addEventListener('animationend', () => {
  circleButton.classList.add('animate');
})

// Обработчики для кнопки "Нажать"
const onCircleButtonAddForm = () => {
  form.classList.add('active');
  form.reset();
  circleButton.classList.remove('animate');
};

const onCircleButtonClick = () => {
  circleButton.addEventListener('click', onCircleButtonAddForm)
}

// Клик по кнопке "Нажать" когда анимация поворота закончилась
circleButton.addEventListener('animationend', onCircleButtonClick);


// Добавление в массив данных о марке авто
const markArray = [];

data.forEach((item) => {
  markArray.push(item.mark);
});

const marks = makeUniq(markArray);

// Вывод в селект данных о марке авто
for (let i = 0; i < marks.length; i++) {
  makeList(marks[i], markSelect);
}

// Выбор модели при изменении марки
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
    makeList(models[i], modelSelect);
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
    makeList(years[i], yearSelect);
  }
});

// Выбор даты доставки после выбора года выпуска
yearSelect.addEventListener('change', () => {
  for (let i = 0; i < data.length; i++) {

    if(data[i].year === yearSelect.value && data[i].model === modelSelect.value) {
      const deliveryArray = data[i].delivery.split('-');
      addCalendar(deliveryArray[0], deliveryArray[1]);
      document.querySelector('.flatpickr-calendar').style.display = 'none';
    }
  }
});


// Появление кнопки доставка, если заполнены все поля
form.addEventListener('change', () => {

  if (markSelect.value !== '' && modelSelect.value !== '' && yearSelect.value !== '') {
    deliveryButton.classList.add('active');
  } else {
    deliveryButton.classList.remove('active');
    document.querySelector('.flatpickr-calendar').style.display = 'none';

  }

  if (date.value !== '') {
    form.classList.remove('active'); // Скрытие формы
    animContainer.style.display = 'none';
    text.style.display = 'block';
    document.querySelector('.flatpickr-calendar').style.display = 'none';
    deliveryButton.classList.remove('active');
  };

  const select = document.querySelectorAll('.auto__select');
  for (let i = 0; i < textSpan.length; i++) {
    textSpan[i].textContent = select[i].value;
  }

  // Удаление клика с кнопки "Нажать", чтобы клик был после анимации
  circleButton.removeEventListener('click', onCircleButtonAddForm)
});


// Появление анимации квадратов после клика на "Начать заново"
againLink.addEventListener('click', (evt) => {
  evt.preventDefault();
  document.querySelector('.auto__text').style.display = 'none';
  animContainer.style.display = 'flex';
});
