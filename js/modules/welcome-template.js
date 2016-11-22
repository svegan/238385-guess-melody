import getElement from './parse-template';
import renderUI from './render-interface';
import artist from './artist-template';

let elem = getElement(`<section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;2 минуты дать
      максимальное количество правильных ответов.<br>
      На&nbsp;каждую мелодию всего 3 варианта ответа.<br>
      Удачи!
    </p>
  </section>`);

let playButton = elem.querySelector('.main-play');

playButton.addEventListener('click', () => {
  renderUI(artist);
});

export default elem;
