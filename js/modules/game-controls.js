import {Welcome, Artist, Genre, Result} from '../screens/screens';
import {content, questions} from '../data/game-data';
import initState from '../data/init-state';
import {setQue, setTime, setLifes} from './data-controls';
import {renderUI} from './utils';

const init = () => {
  const welcome = new Welcome(content.screens.welcome);
  renderUI(welcome.elem);
};

const nextScreen = (data) => {
  try {
    data = setQue(data, data.currentQue + 1);
  } catch (e) {
    const result = new Result(data);
    renderUI(result.elem);
    return;
  }

  let queIndex = data.currentQue - 1;
  switch (questions[queIndex].type) {
    case 'artist':
      const artist = new Artist(questions[queIndex], data);
      renderUI(artist.elem);
      break;
    case 'genre':
      const genre = new Genre(questions[queIndex], data);
      renderUI(genre.elem);
      break;
    default:
      return;
  }
};

const play = () => {
  nextScreen(initState);
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
    const result = new Result(data);
    renderUI(result.elem);
  }
};

const resetTime = (data) => {
  return setTime(data, initState.leftTime);
};

export {initState, init, play, nextScreen, wrongAnswerFn, correctAnswerFn, resetTime, setTime};
