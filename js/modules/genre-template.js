import getElement from './parse-template';
import renderUI from './render-interface';
import result from './result-template';
import data from '../data/genre-data';

const genAnswerMarkup = (item) => {
  return `<div class="genre-answer">
    <div class="player-wrapper"></div>
    <input type="checkbox" name="answer" value="${item.value}" id="${item.id}">
    <label class="genre-answer-check" for="${item.id}"></label>
  </div>`;
};

const answersMarkup = [];

for (let answer of data.question.answers.values()) {
  answersMarkup.push(genAnswerMarkup(answer));
}

const markup = `<section class="main main--level main--level-genre">
    <h2 class="title">${data.question.title}</h2>
    <form class="genre">
      ${answersMarkup.join('')}
      <button class="genre-answer-send" type="submit" disabled>Ответить</button>
    </form>
  </section>`;

let elem = getElement(markup);

const form = elem.querySelector('form.genre');
const button = form.querySelector('.genre-answer-send');
const checkInputs = () => {
  button.disabled = form.querySelectorAll('input[name="answer"]:checked').length === 0;
};

form.addEventListener('click', checkInputs);
button.addEventListener('click', (e) => {
  e.preventDefault();
  renderUI(result);
});

export default elem;
