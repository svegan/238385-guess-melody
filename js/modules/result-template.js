import getElement from './parse-template';
import data from '../data/result-data';

const header = `<section class="logo" title="Угадай мелодию"><h1>${data.header.title}</h1></section>`;
const content = `<h2 class="title">${data.content.title}</h2>
<div class="main-stat">За&nbsp;${data.stats.minutes}&nbsp;минуты<br>вы&nbsp;отгадали ${data.stats.melodies}&nbsp;мелодии</div>
<span class="main-comparison">Это&nbsp;лучше чем у&nbsp;${data.stats.betterThan}&nbsp;игроков</span>
<span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>`;
const markup = `<section class="main main--result">
  ${header}
  ${content}
</section>`;

let elem = getElement(markup);

export default elem;
