import polyfillPromise from 'core-js/es6/promise';
import polyfillObject from 'core-js/es6/object';
import polyfillSymbol from 'core-js/es6/symbol';
if (!window.Promise) {
  window.Promise = polyfillPromise;
}
if (!Object.assign) {
  window.Object = polyfillObject;
}
if (!window.Symbol) {
  window.Symbol = polyfillSymbol;
}
import 'whatwg-fetch';
import {Application} from './modules/modules';
import {gameData} from './data/data';

window.fetch(gameData.serverUrls.questions).
    then((response) => {
      if (response.status === 200) {
        return response;
      } else {
        throw new Error('Ошибка загрузки данных');
      }
    }).
    then((response) => response.json()).
    then((questions) => {
      Application.questions = questions;
      Application.showGreeting();
    }).
    catch((err) => {
      throw new Error('Всё пропало');
    });
