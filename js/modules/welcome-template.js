import getElement from './parse-template';
import renderUI from './render-interface';
import artist from './artist-template';
import data from '../data/welcome-data';

const header = `<section class="logo" title="Угадай мелодию"><h1>${data.header.logoText}</h1></section>
<button class="main-play">Начать игру</button>`;

const content = `<h2 class="title main-title">${data.content.title}</h2>
<p class="text main-text">${data.content.text}</p>`;

const markup = `<section class="main main--welcome">
    ${header}
    ${content}
  </section>`;

const elem = getElement(markup);

const playButton = elem.querySelector('.main-play');

playButton.addEventListener('click', () => {
  renderUI(artist);
});

export default elem;
