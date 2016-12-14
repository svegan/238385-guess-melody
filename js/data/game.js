const gameData = {
  content: {
    title: 'Угадай мелодию',
    screens: {
      welcome: {
        title: 'Правила игры',
        text: `Правила просты&nbsp;— за&nbsp;2 минуты дать
        максимальное количество правильных ответов.<br>
        На&nbsp;каждую мелодию всего 3 варианта ответа.<br>
        Удачи!`
      },
      result: {
        title: 'Вы настоящий меломан!'
      }
    }
  },
  questions: [
    {
      type: 'artist',
      title: 'Кто исполняет эту песню?',
      answers: ['Пелагея', 'Краснознаменная дивизия имени моей бабушки', 'Lorde'],
      audio: null,
      correct: 1
    },
    {
      type: 'artist',
      title: 'Чей это ремейк?',
      answers: ['Ishome', 'The Queen', 'Muse'],
      audio: null,
      correct: 2
    },
    {
      type: 'artist',
      title: 'В каком году вышла эта песня?',
      answers: ['1960', '1970', '1980'],
      audio: null,
      correct: 3
    },
    {
      type: 'artist',
      title: 'Как звали отца исполнителя',
      answers: ['Пётр', 'Валерий', 'Дмитрий'],
      audio: null,
      correct: 1
    },
    {
      type: 'artist',
      title: 'Ещё 1 вопрос',
      answers: ['1 ответ', '2 ответ', '3-ий'],
      audio: null,
      correct: 2
    },
    {
      type: 'genre',
      title: 'Выберите инди-рок треки',
      answers: new Set([
        {
          value: 'answer-1',
          id: 'a-1'
        },
        {
          value: 'answer-2',
          id: 'a-2'
        },
        {
          value: 'answer-3',
          id: 'a-3'
        },
        {
          value: 'answer-4',
          id: 'a-4'
        }
      ]),
      correct: new Set([
        'a-1',
        'a-2'
      ])
    },
    {
      type: 'genre',
      title: 'Выберите chill треки',
      answers: new Set([
        {
          value: 'answer-5',
          id: 'a-5'
        },
        {
          value: 'answer-6',
          id: 'a-6'
        },
        {
          value: 'answer-7',
          id: 'a-7'
        },
        {
          value: 'answer-8',
          id: 'a-8'
        }
      ]),
      correct: new Set([
        'a-6',
        'a-7'
      ])
    },
    {
      type: 'genre',
      title: 'Выберите классические треки',
      answers: new Set([
        {
          value: 'answer-9',
          id: 'a-9'
        },
        {
          value: 'answer-10',
          id: 'a-10'
        },
        {
          value: 'answer-11',
          id: 'a-11'
        },
        {
          value: 'answer-12',
          id: 'a-12'
        }
      ]),
      correct: new Set([
        'a-11',
        'a-12'
      ])
    },
    {
      type: 'genre',
      title: 'Какие лишние',
      answers: new Set([
        {
          value: 'answer-13',
          id: 'a-13'
        },
        {
          value: 'answer-14',
          id: 'a-14'
        },
        {
          value: 'answer-15',
          id: 'a-15'
        },
        {
          value: 'answer-16',
          id: 'a-16'
        }
      ]),
      correct: new Set([
        'a-13',
        'a-14'
      ])
    },
    {
      type: 'genre',
      title: 'Выберите хиты',
      answers: new Set([
        {
          value: 'answer-17',
          id: 'a-17'
        },
        {
          value: 'answer-18',
          id: 'a-18'
        },
        {
          value: 'answer-19',
          id: 'a-19'
        },
        {
          value: 'answer-20',
          id: 'a-20'
        }
      ]),
      correct: new Set([
        'a-18',
        'a-19'
      ])
    }
  ]
};

const content = gameData.content;
const questions = gameData.questions;

export {content, questions};
