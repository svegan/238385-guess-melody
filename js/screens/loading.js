import AbstractView from './common';

class Loading extends AbstractView {
  constructor() {
    super();
  }

  getMarkup() {
    return `<section class="main main--loading">
      <h1>Загрузка результатов...</h1>
    </section>`;
  }
}

const loading = new Loading();

export default loading;
