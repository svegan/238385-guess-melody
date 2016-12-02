import showWelcome from './welcome';
import showArtist from './artist';
import showGenre from './genre';
import showResult from './result';
import {content, questions, stats} from '../data/game-data';
import {initProgress} from '../data/progress-data';
import {setQue, setTime, setLifes} from './data-controls';

const init = () => {
  showWelcome(content.screens.welcome);
};

const nextScreen = (data) => {
  try {
    data = setQue(data, data.currentQue + 1);
  } catch (e) {
    showResult(stats);
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
  nextScreen(setQue(initProgress, 0));
};

const correctAnswerFn = (data) => {
  data.questions.correct++;
  nextScreen(data);
};

const wrongAnswerFn = (data) => {
  try {
    data = setLifes(data, data.lifes - 1);
    nextScreen(data);
  } catch (e) {
    showResult(stats);
  }
};

const resetTime = (data) => {
  return setTime(data, initProgress.leftTime);
};

export {init, play, nextScreen, wrongAnswerFn, correctAnswerFn, resetTime, setTime};
