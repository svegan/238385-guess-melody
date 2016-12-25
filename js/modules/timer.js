import {timerMarkup} from './templates';
import {renderTimer, removeElem} from './utils';
import startTimer from './timer-engine';

export const createTimer = (time, updateTime, callback) => {
  const elem = renderTimer(timerMarkup);
  const stopTimer = startTimer(time, updateTime, callback);
  return {
    elem,
    stopTimer
  };
};

export const removeTimer = (timer) => {
  timer.stopTimer();
  removeElem(timer.elem);
};
