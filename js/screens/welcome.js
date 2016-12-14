import Application from '../application';
import AbstractView from './common';
import {logo, mainTitle} from '../modules/templates';

const play = () => {
  Application.showGame();
};

class Welcome extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  getMarkup() {
    return `<section class="main main--welcome">
        ${logo(this.data.title)}
        <button class="main-play">Начать игру</button>
        ${mainTitle(this.data.screens.welcome.title)}
        <p class="text main-text">${this.data.screens.welcome.text}</p>
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

export default (data) => new Welcome(data);
