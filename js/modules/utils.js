const renderUI = (what) => {
  let container = document.querySelector('.main');
  container.parentNode.replaceChild(what, container);
};

const createElement = (markup) => {
  let container = document.createElement('div');
  container.innerHTML = markup;
  return container.firstChild;
};

export {renderUI, createElement};
