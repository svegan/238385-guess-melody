import {game, renderUI, uploadResult, downloadResults} from './modules';
import {welcome, report} from '../screens/screens';
import {gameData} from '../data/data';

const content = gameData.content;
const url = gameData.serverUrls.results;
let questions;

export default class Application {
  static showGreeting() {
    renderUI(welcome(content).elem);
  }
  static showGame() {
    renderUI(game(questions));
  }
  static showResult(result, initTime) {
    uploadResult(url, result).
        then(() => downloadResults(url)).
        then((results) => {
          renderUI(report({content, results, initTime}).elem);
        }).
        catch((err) => {
          throw new Error('Ошибка обработки результатов');
        });
  }

  static set questions(data) {
    questions = data;
  }
}
