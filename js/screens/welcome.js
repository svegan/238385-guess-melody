import AbstractView from './common';
import {play} from '../modules/game-controls';
import {content as caption} from '../data/game-data';
import {logo, mainTitle} from '../modules/templates';

export default class Welcome extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  getMarkup() {
    return `<section class="main main--welcome">
        ${logo(caption.title)}
        <button class="main-play">Начать игру</button>
        ${mainTitle(this.data.title)}
        <p class="text main-text">${this.data.text}</p>
      </section>`;
  }

  bindHandlers() {
    this.playButton = this.elem.querySelector('.main-play');
    this.playButton.addEventListener('click', play);
  }

  clearHandlers() {
    this.playButton.removeEventListener('click', play);
  }
}
