import AbstractView from './common';
import {title} from '../modules/templates';

const genAnswerMarkup = (answer, index) => {
  return `<div class="genre-answer">
  <div class="player-wrapper"></div>
  <input type="checkbox" name="answer" value="${index}" id="${index}">
  <label class="genre-answer-check" for="${index}"></label>
  </div>`;
};

const checkIfCorrect = (form, question) => {
  console.log(form.elements);
  /* const checkedInputs = form.querySelectorAll('input:checked');
  if (checkedInputs.length !== correctAnswers.size) {
    return false;
  }
  for (let input of checkedInputs) {
    if (!correctAnswers.has(input.id)) {
      return false;
    }
  }
  return true;*/
};

class Genre extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
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

  set onAnswer(handler) {
    this._onAnswer = handler;
  }

  bindHandlers() {
    this.form = this.elem.querySelector('form.genre');
    this.button = this.form.querySelector('.genre-answer-send');
    this.form.addEventListener('click', () => {
      this.button.disabled = this.form.querySelectorAll('input[name="answer"]:checked').length === 0;
    });
    this.button.addEventListener('click', (e) => {
      e.preventDefault();
      if (checkIfCorrect(this.form, this.data)) {
        this._onAnswer(true);
      } else {
        this._onAnswer(false);
      }
    });
  }
}

export default (data) => new Genre(data);
