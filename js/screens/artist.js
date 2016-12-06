import AbstractView from './common';
import {mainTitle, timer} from '../modules/templates';
import {setTime, resetTime, wrongAnswerFn, correctAnswerFn} from '../modules/game-controls';
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

export default class Artist extends AbstractView {
  constructor(data, progress) {
    super();
    this.data = data;
    this.progress = progress;
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

  bindHandlers() {
    const form = this.elem.querySelector('.main-list');
    const timerElem = this.elem.querySelector('.timer-value');
    const timerObj = new Timer(timerElem, this.progress.leftTime, () => {
      this.progress = resetTime(this.progress);
      timerObj.remove();
      wrongAnswerFn(this.progress);
    });
    form.addEventListener('change', (e) => {
      timerObj.stop();
      this.progress = setTime(this.progress, timerObj.getLeftTime());
      timerObj.remove();
      if (form[this.data.correct - 1].checked) {
        correctAnswerFn(this.progress);
      } else {
        wrongAnswerFn(this.progress);
      }
    }, true);
    timerObj.start();
  }
}
