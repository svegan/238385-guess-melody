import showWelcome from './welcome';
import showArtist from './artist';
import showGenre from './genre';
import showResult from './result';
import {content, questions} from '../data/game-data';
import {initProgress} from '../data/progress-data';
import {setQue, setTime, setLifes} from './data-controls';

const init = () => {
  showWelcome(content.screens.welcome);
};

const nextScreen = (data) => {
  try {
    data = setQue(data, data.currentQue + 1);
  } catch (e) {
    showResult(data);
    return;
  }

  let queIndex = data.currentQue - 1;
  switch (questions[queIndex].type) {
    case 'artist':
      showArtist(questions[queIndex], data);
      break;
    case 'genre':
      showGenre(questions[queIndex], data);
      break;
    default:
      return;
  }
};

const play = () => {
  nextScreen(initProgress);
};

const correctAnswerFn = (data) => {
  data.correctQues++;
  nextScreen(data);
};

const wrongAnswerFn = (data) => {
  try {
    data = setLifes(data, data.lifes - 1);
    nextScreen(data);
  } catch (e) {
    showResult(data);
  }
};

const resetTime = (data) => {
  return setTime(data, initProgress.leftTime);
};

export {initProgress, init, play, nextScreen, wrongAnswerFn, correctAnswerFn, resetTime, setTime};
