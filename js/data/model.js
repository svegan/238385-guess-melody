import initState from './init-state';
import {setQue, setTime, setLifes} from './data-controls';

class Model {
  constructor(state = initState) {
    this._state = state;
  }

  get state() {
    return this._state;
  }

  nextQue() {
    this._state = setQue(this._state, this._state.currentQue + 1);
  }

  subtractLife() {
    this._state = setLifes(this._state, this._state.lifes - 1);
  }

  updateTime(time) {
    this._state = setTime(this._state, time);
  }

  restart() {
    this._state = initState;
  }

  isGameOver() {
    return this._state <= 0;
  }
}

export default new Model();
