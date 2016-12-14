import assert from 'assert';
import initProgress from './init';
import {setLifes, setQue, setTime, setCorrectAnswer} from './controls';

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
    it(`Param shouldn\'t be more than ${initProgress.totalQues} and less than 1`, () =>{
      assert.throws(() => {
        setQue(initProgress, -1);
      });
      assert.throws(() => {
        setQue(initProgress, initProgress.totalQues + 1);
      });
      assert.doesNotThrow(() => {
        setQue(initProgress, initProgress.totalQues - 1);
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

describe('Set right answer', () => {
  it(`Param shouldn\'t be more than ${initProgress.totalQues + 1} and less than 1`, () =>{
    assert.throws(() => {
      setCorrectAnswer(initProgress, -1);
    });
    assert.throws(() => {
      setCorrectAnswer(initProgress, initProgress.totalQues + 2);
    });
    assert.doesNotThrow(() => {
      setCorrectAnswer(initProgress, initProgress.totalQues - 1);
    });
  });
});
