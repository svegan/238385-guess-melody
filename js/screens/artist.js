import AbstractView from './common';
import {mainTitle, player} from '../modules/modules';

const genAnswerMarkup = (item, index) => {
  return `<div class="main-answer-wrapper">
  <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="val-${index}" />
  <label class="main-answer" for="answer-${index}">
  <img class="main-answer-preview" src="${item.image.url}" width="${item.image.width}" height="${item.image.height}">
  ${item.title}
  </label>
  </div>`;
};

class Artist extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
    this._onFormChange = this._onFormChange.bind(this);
    this.correct = -1;
    data.answers.some((answer, index) => {
      if (answer.isCorrect) {
        this.correct = index;
        return true;
      }
      return false;
    });
  }

  set onAnswer(handler) {
    this._onAnswer = handler;
    this._applyPlayer();
  }

  getMarkup() {
    return `<section class="main main--level main--level-artist">
        <div class="main-wrap">
          <div class="main-timer"></div>
          ${mainTitle(this.data.question)}
          <div class="player-wrapper"></div>
          <form class="main-list">
            ${this.data.answers.map(genAnswerMarkup).join('')}
          </form>
        </div>
      </section>`;
  }


  bindHandlers() {
    this.form = this.elem.querySelector('.main-list');
    this.form.addEventListener('change', this._onFormChange, true);
  }

  clearHandlers() {
    this.form.removeEventListener('change', this._onFormChange, true);
    this.form = null;
  }

  _onFormChange(e) {
    this.deletePlayer();
    if (this.form.elements.answer[this.correct].checked) {
      this._onAnswer(true);
    } else {
      this._onAnswer(false);
    }
  }

  _applyPlayer() {
    const playerContainer = this.elem.querySelector('.player-wrapper');
    this.deletePlayer = player(playerContainer, this.data.src, true, false);
  }
}

export default (data, time) => new Artist(data, time);
