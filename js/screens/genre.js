import AbstractView from './common';
import {title} from '../modules/templates';
import {wrongAnswerFn, correctAnswerFn} from '../modules/game-controls';

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

export default class Genre extends AbstractView {
  constructor(data, progress) {
    super();
    this.data = data;
    this.progress = progress;
    this.form = this.elem.querySelector('form.genre');
    this.buttom = this.form.querySelector('.genre-answer-send');
  }

  getMarkup() {
    const answersMarkup = [];
    for (let answer of this.data.answers.values()) {
      answersMarkup.push(genAnswerMarkup(answer));
    }
    return `<section class="main main--level main--level-genre">
        ${title(this.data.title)}
        <form class="genre">
          ${answersMarkup.join('')}
          <button class="genre-answer-send" type="submit" disabled>Ответить</button>
        </form>
      </section>`;
  }

  bindHandlers() {
    this.form.addEventListener('click', this._checkInputs);
    this.button.addEventListener('click', this._onAnswer);
  }

  clearHandlers() {
    this.form.removeEventListener('click', this._checkInputs);
    this.button.removeEventListener('click', this._onAnswer);
  }

  _onAnswer(e) {
    e.preventDefault();
    if (checkIfCorrect(this.form, this.data.correct)) {
      correctAnswerFn(this.progress);
    } else {
      wrongAnswerFn(this.progress);
    }
  }

  _checkInputs() {
    this.button.disabled = this.form.querySelectorAll('input[name="answer"]:checked').length === 0;
  }

}
