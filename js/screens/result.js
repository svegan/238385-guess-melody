import AbstractView from './common';
import {Application, logo, title} from '../modules/modules';

const compareFn = (result, results, initTime) => {
  const newResults = results.slice(0);
  newResults.push(result);
  newResults.sort(function (a, b) {
    return b.correctQues - a.correctQues || b.leftTime - a.leftTime;
  });
  const currIndex = newResults.indexOf(result);
  const betterThan = `${Math.round((newResults.length - currIndex) / newResults.length * 100)}%`;
  return {
    betterThan,
    leftTime: initTime - result.leftTime,
    correctQues: result.correctQues
  };
};

const replay = () => {
  Application.showGame();
};

class Result extends AbstractView {
  constructor(data) {
    super();
    this.content = data.content;
    this.data = data.currResult;
    this.report = compareFn(data.currResult, data.results, data.initTime);
  }

  getMarkup() {
    return `<section class="main main--result">
      ${logo(this.content.title)}
      ${title(this.content.screens.result.title)}
      <div class="main-stat">За&nbsp;${this.report.leftTime}&nbsp;секунд<br>вы&nbsp;отгадали ${this.report.correctQues}&nbsp;мелодии</div>
      <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${this.report.betterThan}&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }

  bindHandlers() {
    this.replay = this.elem.querySelector('.main-replay');
    this.replay.addEventListener('click', replay);
  }

  clearHandlers() {
    this.replay.removeEventListener('click', replay);
  }
}

export default (data) => new Result(data);
