import {Application, renderUI, createTimer, removeTimer} from './modules';
import {gameData, model} from '../data/data';
import {loading, artist, genre} from '../screens/screens';

const queTypes = gameData.questions.types;

class GamePresenter {
  constructor(questions, GameModel) {
    this.data = GameModel;
    this.data.questions = questions;
    this.data.questionsAmount = this.data.questions.length;
    this.tick = this.tick.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  startGame() {
    this.data.restart();
    this.startTimer();
    this.content = this.createLevel(this.data.currentQuestion);
    this.content.onAnswer = this.answer.bind(this);
    this.updateView(this.content);
  }

  startTimer() {
    this.timer = createTimer(this.data.time, this.tick, this.endGame);
  }

  tick() {
    this.data.timerTick();
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
        return artist(this.data.questions[questionNumber]);
      case queTypes.GENRE:
        return genre(this.data.questions[questionNumber]);
      default:
        return false;
    }
  }

  answer(correct) {
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

  endGame() {
    removeTimer(this.timer);
    renderUI(loading.elem);
    Application.showResult(this.data.result, this.data.initTime);
  }
}

export default (questions) => {
  const game = new GamePresenter(questions, model);
  game.startGame();
  return game.content.elem;
};
