import {renderUI, createElement} from './utils';
import {content as caption} from '../data/game-data';
import {logo, title} from './templates';
import {initProgress, init} from './game-controls';
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

export default (data) => {
  const report = compareFn(data, commonStat);
  const markup = `<section class="main main--result">
    ${logo(caption.title)}
    ${title(caption.screens.result.title)}
    <div class="main-stat">За&nbsp;${report.minutes}&nbsp;минут(ы)<br>вы&nbsp;отгадали ${report.melodies}&nbsp;мелодии</div>
    <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${report.betterThan}&nbsp;игроков</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

  const elem = createElement(markup);
  const replay = elem.querySelector('.main-replay');
  replay.addEventListener('click', init);
  renderUI(elem);
  return elem;
};
