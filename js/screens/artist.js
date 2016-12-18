import AbstractView from './common';
import {mainTitle, timerMarkup, Timer, player} from '../modules/modules';

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
  constructor(data, time) {
    super();
    this.data = data;
    this.initTime = time;
    this.correct = data.answers.findIndex((answer) => answer.isCorrect);
  }

  getMarkup() {
    return `<section class="main main--level main--level-artist">
        ${timerMarkup}
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

  set onAnswer(handler) {
    this._onAnswer = handler;
    this._applyTimer();
    this._applyPlayer();
  }

  bindHandlers() {
    const form = this.elem.querySelector('.main-list');
    form.addEventListener('change', (e) => {
      this.timerObj.stop();
      const time = this.timerObj.getLeftTime();
      this.timerObj.remove();
      this.deletePlayer();
      if (form.elements.answer[this.correct].checked) {
        this._onAnswer(true, time);
      } else {
        this._onAnswer(false, time);
      }
    }, true);
  }

  _applyTimer() {
    this.timerElem = this.elem.querySelector('.timer-value');
    this.timerObj = new Timer(this.timerElem, this.initTime, () => {
      this.timerObj.remove();
      this._onAnswer(false, 'reset');
    });
    this.timerObj.start();
  }

  _applyPlayer() {
    const playerContainer = this.elem.querySelector('.player-wrapper');
    this.deletePlayer = player(playerContainer, this.data.src, true, false);
  }
}

export default (data, time) => new Artist(data, time);
