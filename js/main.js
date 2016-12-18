import {Application} from './modules/modules';
import 'whatwg-fetch';

window.fetch('https://intensive-ecmascript-server-qybmlbpxoi.now.sh/guess-melody/questions').
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
