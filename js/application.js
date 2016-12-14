import {default as game} from './modules/game';
import {welcome, result as overView} from './screens/screens';
import {renderUI} from './modules/utils';
import {content} from './data/game';
import results from './data/results';

export default class Application {
  static showGreeting() {
    renderUI(welcome(content).elem);
  }
  static showGame() {
    renderUI(game());
  }
  static showResult(result, initTime) {
    renderUI(overView({content, result, results, initTime}).elem);
  }
}
