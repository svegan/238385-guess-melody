import {renderUI, createElement, questionHandler} from './utils';
import {content as caption} from './data';
import {logo, mainTitle} from './templates';

export default (data) => {
  const markup = `<section class="main main--welcome">
      ${logo(caption.title)}
      <button class="main-play">Начать игру</button>
      ${mainTitle(data.title)}
      <p class="text main-text">${data.text}</p>
    </section>`;

  const elem = createElement(markup);
  const playButton = elem.querySelector('.main-play');
  playButton.addEventListener('click', questionHandler());
  renderUI(elem);
  return elem;
};
