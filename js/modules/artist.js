import {renderUI, createElement} from './utils';
import {mainTitle, timer} from './templates';
import {setTime, resetTime, wrongAnswerFn, correctAnswerFn} from './game-controls';
import Timer from './timer';

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

export default (data, progress) => {

  const markup = `<section class="main main--level main--level-artist">
      ${timer}
      <div class="main-wrap">
        <div class="main-timer"></div>
        ${mainTitle(data.title)}
        <div class="player-wrapper"></div>
        <form class="main-list">
          ${data.answers.map(genAnswerMarkup).join('')}
        </form>
      </div>
    </section>`;

  const elem = createElement(markup);
  const form = elem.querySelector('.main-list');
  const timerElem = elem.querySelector('.timer-value');
  const timerObj = new Timer(timerElem, progress.leftTime, function () {
    progress = resetTime(progress);
    timerObj.remove();
    wrongAnswerFn(progress);
  });

  form.addEventListener('click', function (e) {
    if (e.target.classList.contains('main-answer') || e.target.parentNode.classList.contains('main-answer')) {
      timerObj.stop();
      progress = setTime(progress, timerObj.getLeftTime());
      timerObj.remove();
      if (form[`${data.correct - 1}`].checked) {
        wrongAnswerFn(progress);
      } else {
        correctAnswerFn(progress);
      }
    }
  }, true);

  renderUI(elem);
  timerObj.start();
  return elem;
};
