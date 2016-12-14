import Application from '../application';
import model from '../data/model';
import {renderUI} from './utils';
import {questions} from '../data/game';
import {artist, genre} from '../screens/screens';

class GamePresenter {
  constructor(GameModel) {
    this.data = GameModel;
    this.content = this.createLevel(this.data.currentQuestion);
  }

  startGame() {
    this.content.onAnswer = this.answer.bind(this);
    this.updateView(this.content);
  }

  changeQuestion() {
    if (this.data.nextQue()) {
      const que = this.createLevel(this.data.currentQuestion);
      que.onAnswer = this.answer.bind(this);
      this.updateView(que);
      this.content = que;
    } else {
      this.endGame();
    }
  }

  createLevel(questionNumber) {
    switch (questions[questionNumber].type) {
      case 'artist':
        return artist(questions[questionNumber], this.data.time);
      case 'genre':
        return genre(questions[questionNumber]);
      default:
        return false;
    }
  }

  answer(correct, time) {
    if (time) {
      switch (true) {
        case typeof time === 'number':
          this.data.updateTime(time);
          break;
        case time === 'reset':
          this.data.resetTime();
          break;
        default:
          throw new Error('Ошибка таймера');
      }
    }
    switch (correct) {
      case true:
        this.data.rightAnswer();
        break;
      case false:
        this.data.subtractLife();
        break;
      default:
        return;
    }
    if (!this.data.isGameOver()) {
      this.changeQuestion();
      return;
    }
    this.endGame();
  }

  updateView(que) {
    renderUI(que.elem);
  }

  restart() {
    this.data.restart();
    this.content = this.createLevel(this.data.currentQuestion);
    this.startGame();
  }

  endGame() {
    Application.showResult(this.data.result, this.data.initTime);
  }
}

const game = new GamePresenter(model);

export default () => {
  game.restart();
  return game.content.elem;
};
