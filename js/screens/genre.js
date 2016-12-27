import AbstractView from './common';
import {title, player} from '../modules/modules';

const genAnswerMarkup = (answer, index) => {
  return `<div class="genre-answer">
  <div class="player-wrapper"></div>
  <input type="checkbox" name="answer" value="${index}" id="${index}">
  <label class="genre-answer-check" for="${index}"></label>
  </div>`;
};

const checkIfCorrect = (checkboxes, question) => {
  const correctAnswers = [];
  question.answers.forEach((answer, index) => {
    if (answer.genre === question.genre) {
      correctAnswers.push(index);
    }
  });
  if ((Array.prototype.filter.call(checkboxes, (elem) => elem.checked)).length !== correctAnswers.length) {
    return false;
  }
  for (let answer of correctAnswers) {
    if (!checkboxes[answer].checked) {
      return false;
    }
  }
  return true;
};

class Genre extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
    this._onButtonClick = this._onButtonClick.bind(this);
    this._onFormClick = this._onFormClick.bind(this);
  }

  set onAnswer(handler) {
    this._onAnswer = handler;
    this._applyPlayer();
  }

  getMarkup() {
    const answersMarkup = this.data.answers.map((answer, index) =>{
      return genAnswerMarkup(answer, index);
    }).join('');
    return `<section class="main main--level main--level-genre">
        ${title(this.data.question)}
        <form class="genre">
          ${answersMarkup}
          <button class="genre-answer-send" type="submit" disabled>Ответить</button>
        </form>
      </section>`;
  }


  bindHandlers() {
    this.form = this.elem.querySelector('form.genre');
    this.button = this.form.querySelector('.genre-answer-send');
    this.form.addEventListener('click', this._onFormClick);
    this.button.addEventListener('click', this._onButtonClick);
  }

  clearHandlers() {
    this.form.removeEventListener('click', this._onFormClick);
    this.button.removeEventListener('click', this._onButtonClick);
    this.form = null;
    this.button = null;
  }

  _onFormClick() {
    this.button.disabled = this.form.querySelectorAll('input[name="answer"]:checked').length === 0;
  }

  _onButtonClick(e) {
    e.preventDefault();
    this.players.forEach((deletePlayer) => deletePlayer());
    if (checkIfCorrect(this.form.elements.answer, this.data)) {
      this._onAnswer(true);
    } else {
      this._onAnswer(false);
    }
  }

  _applyPlayer() {
    const playerContainers = this.elem.querySelectorAll('.player-wrapper');
    this.players = [];
    this.data.answers.forEach((answer, index) => {
      this.players.push(player(playerContainers[index], answer.src));
    });
  }
}

export default (data) => new Genre(data);
