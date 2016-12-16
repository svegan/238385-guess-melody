import game from './modules/game';
import {welcome, result} from './screens/screens';
import {renderUI} from './modules/utils';
import gameData from './data/game';
import results from './data/results';

const content = gameData.content;
let questions;

export default class Application {
  static showGreeting() {
    renderUI(welcome(content).elem);
  }
  static showGame() {
    renderUI(game(questions));
  }
  static showResult(currResult, initTime) {
    renderUI(result({content, currResult, results, initTime}).elem);
  }

  static set questions(data) {
    questions = data;
  }
}

export {renderUI, gameData};
