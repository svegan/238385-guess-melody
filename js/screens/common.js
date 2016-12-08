import {createElement} from '../modules/utils';

export default class AbstractView {
  get elem() {
    if (!this._element) {
      this._element = createElement(this.getMarkup());
      this.bindHandlers();
    }
    return this._element;
  }
  getMarkup() {
    throw new Error('Метод "getMarkup" должен описываться в дочернем классе');
  }
  bindHandlers() {}
  clearHandlers() {}
}
