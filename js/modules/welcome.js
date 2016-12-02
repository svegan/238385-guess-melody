import {renderUI, createElement} from './utils';
import {play} from './game-controls';
import {content as caption} from '../data/game-data';
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
  playButton.addEventListener('click', play);
  renderUI(elem);
  return elem;
};
