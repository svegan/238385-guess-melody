import getElement from './parse-template';
import renderUI from './render-interface';
import genre from './genre-template';
import data from '../data/artist-data';

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

const header = `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
  <circle
    cx="390" cy="390" r="370"
    class="timer-line"
    style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

  <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
    <span class="timer-value-mins">02</span><!--
    --><span class="timer-value-dots">:</span><!--
    --><span class="timer-value-secs">00</span>
  </div>
</svg>`;
const question = `<div class="main-wrap">
  <div class="main-timer"></div>
  <h2 class="title main-title">${data.question.title}</h2>
  <div class="player-wrapper"></div>
  <form class="main-list">
    ${data.question.answers.map(genAnswerMarkup).join('')}
  </form>
</div>`;

const markup = `<section class="main main--level main--level-artist">
    ${header}
    ${question}
  </section>`;

const elem = getElement(markup);

const form = elem.querySelector('.main-list');
form.addEventListener('click', function (e) {
  if (e.target.classList.contains('main-answer') || e.target.parentNode.classList.contains('main-answer')) {
    renderUI(genre);
  }
}, true);

export default elem;
