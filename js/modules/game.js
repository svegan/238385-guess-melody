import Application, {renderUI, gameData} from '../application';
// import gameData from '../data/game';
import model from '../data/model';
import {artist, genre} from '../screens/screens';

const queTypes = gameData.questions.types;

class GamePresenter {
  constructor(questions, GameModel) {
    this.data = GameModel;
    this.data.questions = questions;
    this.data.questionsAmount = this.data.questions.length;
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
    switch (this.data.questions[questionNumber].type) {
      case queTypes.ARTIST:
        return artist(this.data.questions[questionNumber], this.data.time);
      case queTypes.GENRE:
        // console.log(this.data.questions[questionNumber]);
        return genre(this.data.questions[questionNumber]);
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

export default (questions) => {
  const game = new GamePresenter(questions, model);
  game.restart();
  return game.content.elem;
};
