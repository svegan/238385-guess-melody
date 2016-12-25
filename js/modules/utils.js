export const renderUI = (what) => {
  let container = document.querySelector('.main');
  container.parentNode.replaceChild(what, container);
};

export const renderTimer = (markup) => {
  const app = document.querySelector('.app');
  const timer = document.createElement('div');
  timer.classList.add('timer-wrap');
  timer.innerHTML = markup;
  if (app.firstChild) {
    app.insertBefore(timer, app.firstChild);
  } else {
    app.appendChild(timer);
  }
  return timer;
};

export const removeElem = (elem) => {
  elem.parentNode.removeChild(elem);
};

export const createElement = (markup) => {
  let container = document.createElement('div');
  container.innerHTML = markup;
  return container.firstChild;
};

export const compareFn = (results, initTime) => {
  const current = results.reduce((prev, curr) => {
    return (prev.date > curr.date) ? prev : curr;
  });
  results.sort(function (a, b) {
    return b.answers - a.answers || b.time - a.time;
  });
  const currIndex = results.indexOf(current);
  const compare = `${Math.round((results.length - currIndex) / results.length * 100)}%`;
  return {
    compare,
    time: initTime - current.time,
    answers: current.answers
  };
};

export const uploadResult = (url, result) => {
  return window.fetch(url, {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(result)
  });
};

export const downloadResults = (url) => {
  return window.fetch(url, {
    method: 'get',
    headers: {
      'Content-type': 'application/json'
    }
  }).
      then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          throw new Error('Ошибка загрузки предыдущих результатов');
        }
      }).
      then((response) => response.json());
};
