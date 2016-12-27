import {Application, renderUI, createTimer, removeTimer} from './modules';
import {gameData, model} from '../data/data';
import {loading, artist, genre} from '../screens/screens';

const queTypes = gameData.questions.types;

class GamePresenter {
  constructor(questions, GameModel) {
    this.data = GameModel;
    this.data.questions = questions;
    this.data.questionsAmount = this.data.questions.length;
    this._tick = this._tick.bind(this);
    this._endGame = this._endGame.bind(this);
  }

  startGame() {
    this.data.restart();
    this._startTimer();
    this.content = this._createLevel(this.data.currentQuestion);
    this.content.onAnswer = this._answer.bind(this);
    this._updateView(this.content);
  }

  _startTimer() {
    this.timer = createTimer(this.data.time, this._tick, this._endGame);
  }

  _tick() {
    this.data.timerTick();
  }

  _changeQuestion() {
    const isNextQueExist = this.data.nextQue();
    if (isNextQueExist) {
      const que = this._createLevel(this.data.currentQuestion);
      que.onAnswer = this._answer.bind(this);
      this._updateView(que);
      this.content = que;
    } else {
      this._endGame();
    }
  }

  _createLevel(questionNumber) {
    switch (this.data.questions[questionNumber].type) {
      case queTypes.ARTIST:
        return artist(this.data.questions[questionNumber]);
      case queTypes.GENRE:
        return genre(this.data.questions[questionNumber]);
      default:
        return false;
    }
  }

  _answer(correct) {
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
      this._changeQuestion();
      return;
    }
    this._endGame();
  }

  _updateView(que) {
    renderUI(que.elem);
  }

  _endGame() {
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
