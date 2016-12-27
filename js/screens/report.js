import AbstractView from './common';
import {Application, logo, title, compareFn} from '../modules/modules';

class Result extends AbstractView {
  constructor(data) {
    super();
    this.content = data.content;
    this.report = compareFn(data.results, data.initTime);
    this._replay = this._replay.bind(this);
  }

  getMarkup() {
    return `<section class="main main--result">
      ${logo(this.content.title)}
      ${title(this.content.screens.result.title)}
      <div class="main-stat">За&nbsp;${this.report.time}&nbsp;секунд<br>вы&nbsp;отгадали ${this.report.answers}&nbsp;мелодии</div>
      <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${this.report.compare}&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }

  bindHandlers() {
    this.replay = this.elem.querySelector('.main-replay');
    this.replay.addEventListener('click', this._replay);
  }

  clearHandlers() {
    this.replay.removeEventListener('click', this._replay);
    this.replay = null;
  }

  _replay() {
    Application.showGame();
  }
}

export default (data) => new Result(data);
