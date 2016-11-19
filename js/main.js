import welcome from './modules/welcome-template';
import artist from './modules/artist-template';
import genre from './modules/genre-template';
import result from './modules/result-template';

(function () {

  let slides = [
    welcome,
    artist,
    genre,
    result
  ];
  let current = -1;

  let select = (index) => {
    current = index;
    let mainElement = document.querySelector('.main');
    mainElement.parentNode.replaceChild(slides[index], mainElement);
  };

  document.onkeydown = (evt) => {
    evt.preventDefault();

    switch (evt.keyCode) {
      case 37: current--; break;
      case 39: current++; break;
    }

    select(current);
  };

  select(0);
})();
