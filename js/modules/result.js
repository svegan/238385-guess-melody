import {renderUI, createElement, play} from './utils';
import {content as caption} from './data';
import {logo, title} from './templates';

export default (data) => {

  const markup = `<section class="main main--result">
    ${logo(caption.title)}
    ${title(caption.screens.result.title)}
    <div class="main-stat">За&nbsp;${data.minutes}&nbsp;минуты<br>вы&nbsp;отгадали ${data.melodies}&nbsp;мелодии</div>
    <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${data.betterThan}&nbsp;игроков</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

  const elem = createElement(markup);
  const playButton = elem.querySelector('.main-replay');
  playButton.addEventListener('click', play);
  renderUI(elem);
  return elem;
};
