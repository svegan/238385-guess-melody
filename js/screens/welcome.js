import Application from '../modules/application';
import AbstractView from './common';
import {logo, mainTitle} from '../modules/templates';

class Welcome extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
    this._play = this._play.bind(this);
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
    this.playButton.addEventListener('click', this._play);
  }

  clearHandlers() {
    this.playButton.removeEventListener('click', this._play);
    this.playButton = null;
  }

  _play() {
    Application.showGame();
  }
}

export default (data) => new Welcome(data);
