import {createElement} from '../modules/utils';

export default class AbstractView {
  get elem() {
    if (!this._element) {
      this._element = createElement(this.getMarkup());
    }
  }
  getMarkup() {
    throw new Error('Метод "getMarkup" должен описываться в дочернем классе');
  }
  bindHandlers() {}
  clearHandlers() {}
}
