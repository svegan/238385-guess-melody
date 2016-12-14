import initState from './init';
import {setQue, setTime, setLifes, setCorrectAnswer} from './controls';

class Model {
  constructor(state = initState) {
    this._state = state;
  }

  set state(state) {
    this._state = state;
  }

  get state() {
    return this._state;
  }

  get time() {
    return this.state.leftTime;
  }

  get currentQuestion() {
    return this.state.currentQue;
  }

  get result() {
    return {
      leftTime: this.state.leftTime,
      correctQues: this.state.correctQues
    };
  }

  get initTime() {
    return initState.leftTime;
  }

  restart() {
    this.state = initState;
  }

  nextQue() {
    try {
      this.state = setQue(this.state, this.state.currentQue + 1);
      return true;
    } catch (e) {
      return false;
    }
  }

  rightAnswer() {
    try {
      this.state = setCorrectAnswer(this.state, this.state.correctQues + 1);
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

  updateTime(time) {
    try {
      this._state = setTime(this._state, time);
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
