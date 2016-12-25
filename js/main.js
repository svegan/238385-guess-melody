import {Application} from './modules/modules';
import {gameData} from './data/data';
import 'whatwg-fetch';

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
