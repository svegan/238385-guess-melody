import {renderUI, createElement} from './utils';
import {title} from './templates';
import {wrongAnswerFn, correctAnswerFn} from './game-controls';

const genAnswerMarkup = (answer) => {
  return `<div class="genre-answer">
  <div class="player-wrapper"></div>
  <input type="checkbox" name="answer" value="${answer.value}" id="${answer.id}">
  <label class="genre-answer-check" for="${answer.id}"></label>
  </div>`;
};

const checkIfCorrect = (form, correctAnswers) => {
  const checkedInputs = form.querySelectorAll('input:checked');
  if (checkedInputs.length !== correctAnswers.size) {
    return false;
  }
  for (let input of checkedInputs) {
    if (!correctAnswers.has(input.id)) {
      return false;
    }
  }
  return true;
};

export default (data, progress) => {

  const answersMarkup = [];

  for (let answer of data.answers.values()) {
    answersMarkup.push(genAnswerMarkup(answer));
  }

  const markup = `<section class="main main--level main--level-genre">
      ${title(data.title)}
      <form class="genre">
        ${answersMarkup.join('')}
        <button class="genre-answer-send" type="submit" disabled>Ответить</button>
      </form>
    </section>`;

  let elem = createElement(markup);

  const form = elem.querySelector('form.genre');
  const button = form.querySelector('.genre-answer-send');
  const checkInputs = () => {
    button.disabled = form.querySelectorAll('input[name="answer"]:checked').length === 0;
  };

  form.addEventListener('click', checkInputs);
  button.addEventListener('click', (e) => {
    e.preventDefault();
    if (checkIfCorrect(form, data.correct)) {
      correctAnswerFn(progress);
    } else {
      wrongAnswerFn(progress);
    }
  });

  renderUI(elem);
  return elem;
};
