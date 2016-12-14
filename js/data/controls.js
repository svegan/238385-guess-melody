const setLifes = (data, num) => {
  if (num < 0 || num > 3) {
    throw new Error('Num shouldn\'t be more than 3 or less than 0');
  }
  return Object.assign({}, data, {lifes: num});
};

const setQue = (data, num) => {
  if (num < 0 || num > data.totalQues) {
    throw new Error(`Num shouldn\'t be more than ${data.totalQues} or less than 0`);
  }
  return Object.assign({}, data, {currentQue: num});
};

const setTime = (data, time) => {
  if (time < 0) {
    throw new Error('Time can\'t be less than 0');
  }
  return Object.assign({}, data, {leftTime: time});
};

const setCorrectAnswer = (data, num) => {
  if (num < 0 || num > data.totalQues + 1) {
    throw new Error(`Num shouldn\'t be more than ${data.totalQues} or less than 0`);
  }
  return Object.assign({}, data, {correctQues: num});
};

export {setLifes, setQue, setTime, setCorrectAnswer};
