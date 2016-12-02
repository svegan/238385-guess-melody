import assert from 'assert';
import {initProgress} from '../data/progress-data';
import {setLifes, setQue, setTime} from './data-controls';

describe('Data control functions', () => {
  describe('Amount of lifes changing function', () => {
    it('Param shouldn\'t be more than 3 or less than 0', function () {
      assert.throws(() => {
        setLifes(initProgress, 4);
      });
      assert.throws(() => {
        setLifes(initProgress, -1);
      });
      assert.doesNotThrow(() => {
        setLifes(initProgress, 1);
      });
    });
  });

  describe('Changing current question', () => {
    it(`Param shouldn\'t be more than ${initProgress.questions.total} and less than 1`, () =>{
      assert.throws(() => {
        setQue(initProgress, -1);
      });
      assert.throws(() => {
        setQue(initProgress, initProgress.questions.total + 1);
      });
      assert.doesNotThrow(() => {
        setQue(initProgress, initProgress.questions.total - 1);
      });
    });
  });

  describe('Changing timer', () => {
    it('Param shouldn\'t be less than 0', () =>{
      assert.throws(() => {
        setTime(initProgress, -5);
      });
      assert.doesNotThrow(() => {
        setTime(initProgress, 100);
      });
      assert.doesNotThrow(() => {
        setTime(initProgress, 0);
      });
    });
  });
});
