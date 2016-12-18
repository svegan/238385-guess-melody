import {game, renderUI} from './modules';
import {welcome, result} from '../screens/screens';
import {gameData, results} from '../data/data';

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
