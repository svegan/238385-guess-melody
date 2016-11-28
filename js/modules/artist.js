import {renderUI, createElement, questionHandler} from './utils';
import {mainTitle, svg} from './templates';

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

export default (data) => {

  const markup = `<section class="main main--level main--level-artist">
      ${svg}
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
  form.addEventListener('click', function (e) {
    if (e.target.classList.contains('main-answer') || e.target.parentNode.classList.contains('main-answer')) {
      questionHandler()();
    }
  }, true);

  renderUI(elem);
  return elem;
};
