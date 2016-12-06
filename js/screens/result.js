import AbstractView from './common';
import {content as caption} from '../data/game-data';
import {logo, title} from '../modules/templates';
import {initProgress, init} from '../modules/game-controls';
import commonStat from '../data/statistic-data';

const compareFn = (progress, lastResult) => {
  const result = {
    time: progress.leftTime,
    answers: progress.correctQues,
    current: true
  };
  let newResult = lastResult.slice(0);
  newResult.push(result);
  newResult.sort(function (a, b) {
    return b.answers - a.answers || b.time - a.time;
  });
  const currIndex = newResult.indexOf(result);
  const betterThan = `${Math.round((newResult.length - currIndex) / newResult.length * 100)}%`;
  const report = {
    betterThan,
    minutes: Math.floor((initProgress.leftTime - progress.leftTime) / 60),
    melodies: progress.correctQues
  };
  return report;
};

export default class Result extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
    this.report = compareFn(data, commonStat);
    this.replay = this.elem.querySelector('.main-replay');
  }

  getMarkup() {
    return `<section class="main main--result">
      ${logo(caption.title)}
      ${title(caption.screens.result.title)}
      <div class="main-stat">За&nbsp;${this.report.minutes}&nbsp;минут(ы)<br>вы&nbsp;отгадали ${this.report.melodies}&nbsp;мелодии</div>
      <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${this.report.betterThan}&nbsp;игроков</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }
  bindHandlers() {
    this.replay.addEventListener('click', init);
  }

  clearHandlers() {
    this.replay.removeEventListener('click', init);
  }
}
