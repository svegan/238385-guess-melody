import showWelcome from './welcome';
import showArtist from './artist';
import showGenre from './genre';
import showResult from './result';
import {content, questions, stats} from './data';

let ques = questions.values();

const renderUI = (what) => {
  let container = document.querySelector('.main');
  container.parentNode.replaceChild(what, container);
};

const createElement = (markup) => {
  let container = document.createElement('div');
  container.innerHTML = markup;
  return container.firstChild;
};

const questionHandler = () => {
  let currentQues = ques.next().value;
  return () => {
    if (!currentQues) {
      showResult(stats);
      return;
    }
    switch (currentQues.type) {
      case 'artist':
        showArtist(currentQues);
        break;
      case 'genre':
        showGenre(currentQues);
        break;
      default:
        return;
    }
  };
};

const play = () => {
  ques = questions.values();
  showWelcome(content.screens.welcome);
};

export {renderUI, createElement, questionHandler, play};
