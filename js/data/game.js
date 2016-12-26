export default {
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
  questions: {
    types: {
      GENRE: 'genre',
      ARTIST: 'artist'
    },
    genres: {
      COUNTRY: 'country',
      BLUES: 'blues',
      FOLK: 'folk',
      CLASSICAL: 'classical',
      ELECTRONIC: 'electronic',
      HIP_HOP: 'hip-hop',
      JAZZ: 'jazz',
      POP: 'pop',
      ROCK: 'rock'
    }
  },
  serverUrls: {
    questions: 'https://intensive-ecmascript-server-qybmlbpxoi.now.sh/guess-melody/questions',
    results: 'https://intensive-ecmascript-server-zevreglhzz.now.sh/guess-melody/stats/238385'
  }
};
