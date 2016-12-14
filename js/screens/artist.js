import AbstractView from './common';
import {mainTitle, timer} from '../modules/templates';
import Timer from '../modules/timer';

const genAnswerMarkup = (item, index) => {
  let curIndex = index + 1;
  return `<div class="main-answer-wrapper">
  <input class="main-answer-r" type="radio" id="answer-${curIndex}" name="answer" value="val-${curIndex}" />
  <label class="main-answer" for="answer-${curIndex}">
  <img class="main-answer-preview" src="">
  ${item}
  </label>
  </div>`;
};

class Artist extends AbstractView {
  constructor(data, time) {
    super();
    this.data = data;
    this.initTime = time;
  }

  getMarkup() {
    return `<section class="main main--level main--level-artist">
        ${timer}
        <div class="main-wrap">
          <div class="main-timer"></div>
          ${mainTitle(this.data.title)}
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
  }

  bindHandlers() {
    const form = this.elem.querySelector('.main-list');
    form.addEventListener('change', (e) => {
      this.timerObj.stop();
      const time = this.timerObj.getLeftTime();
      this.timerObj.remove();
      if (form[this.data.correct - 1].checked) {
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
}

export default (data, time) => new Artist(data, time);
