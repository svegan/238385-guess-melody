import initState from './init';
import {setQue, setTime, setLifes, setCorrectAnswer} from './controls';

class Model {
  constructor(state = initState) {
    this._state = state;
  }

  set state(state) {
    this._state = state;
  }

  set questionsAmount(amount) {
    this._state.totalQues = amount;
  }

  set questions(questions) {
    this._state.questions = questions;
  }

  get questions() {
    return this._state.questions;
  }

  get state() {
    return this._state;
  }

  get time() {
    return this._state.leftTime;
  }

  get currentQuestion() {
    return this._state.currentQue;
  }

  get result() {
    return {
      time: this._state.leftTime,
      answers: this._state.correctQues
    };
  }

  get initTime() {
    return initState.leftTime;
  }

  restart() {
    this._state = initState;
  }

  nextQue() {
    try {
      this._state = setQue(this._state, this._state.currentQue + 1);
      return true;
    } catch (e) {
      return false;
    }
  }

  rightAnswer() {
    try {
      this._state = setCorrectAnswer(this._state, this._state.correctQues + 1);
      return true;
    } catch (e) {
      return false;
    }
  }

  subtractLife() {
    try {
      this._state = setLifes(this._state, this._state.lifes - 1);
      return true;
    } catch (e) {
      return false;
    }
  }

  timerTick() {
    try {
      this._state = setTime(this._state, this.time - 1);
      return true;
    } catch (e) {
      return false;
    }
  }

  resetTime() {
    try {
      this._state = setTime(this._state, initState.leftTime);
      return true;
    } catch (e) {
      return false;
    }
  }

  isGameOver() {
    return this._state.lifes === 0;
  }

}

export default new Model();
