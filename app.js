require('dotenv').config();
const { PORT } = process.env;
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');

// подключем session-file-store // Предварительно установив библиотеку - npm i session-file-store
const FileStore = require('session-file-store')(session);

// Импортируем созданный в отдельный файлах рутеры.
const usersRouter = require('./routes/users');
const trackRouter = require('./routes/track');
const adminCabRouter = require('./routes/adminCab');
const clientCabRouter = require('./routes/clientCab');

// Импортируем middleware:
const { superUserName } = require('./middleware/common')

const app = express();

// Прописываем конфиг для сессии:
const sessionConfig = {
  store: new FileStore(),
  name: "MyCookieName",
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    httpOnly: true,
  },
};


// Сообщаем express, что в качестве шаблонизатора используется "hbs".
app.set('view engine', 'hbs');
// Сообщаем express, что шаблона шаблонизаторая (вью) находятся в папке "ПапкаПроекта/views".
app.set('views', path.join(__dirname, 'views'));

// Подключаем middleware morgan с режимом логирования "dev", чтобы для каждого HTTP-запроса на сервер в консоль выводилась информация об этом запросе.
app.use(logger('dev'));

// Подключаем сессию 
app.use(session(sessionConfig));

// Подключаем middleware
app.use(superUserName);

// Подключаем middleware, которое сообщает epxress, что в папке "ПапкаПроекта/public" будут находится статические файлы, т.е. файлы доступные для скачивания из других приложений.
app.use(express.static(path.join(__dirname, 'public')));
// Подключаем middleware, которое позволяет читать содержимое body из HTTP-запросов типа POST, PUT и DELETE.
app.use(express.urlencoded({ extended: true }));
// Подключаем middleware, которое позволяет читать переменные JavaScript, сохранённые в формате JSON в body HTTP-запроса.
app.use(express.json());

// Указываем пути:
app.use('/', usersRouter);
app.use('/', trackRouter);
app.use('/', adminCabRouter);
app.use('/', clientCabRouter);

//Если страницы нет, перебросит на главную
app.get('*', (req, res) => {
  res.redirect('/');
});

// Если HTTP-запрос дошёл до этой строчки, значит ни один из ранее встречаемых рутов не ответил на запрос. Это значит, что искомого раздела просто нет на сайте. Для таких ситуаций используется код ошибки 404. Создаём небольшое middleware, которое генерирует соответствующую ошибку.
app.use((req, res, next) => {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
});

// Отлавливаем HTTP-запрос с ошибкой и отправляем на него ответ.
app.use(function (err, req, res, next) {
  // Получаем текущий ражим работы приложения.
  const appMode = req.app.get('env');
  // Создаём объект, в котором будет храниться ошибка.
  let error;

  // Если мы находимся в режиме разработки, то отправим в ответе настоящую ошибку. В противно случае отправим пустой объект.
  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  // Записываем информацию об ошибке и сам объект ошибки в специальные переменные, доступные на сервере глобально, но только в рамках одного HTTP-запроса.
  res.locals.message = err.message;
  res.locals.error = error;

  // Задаём в будущем ответе статус ошибки. Берём его из объекта ошибки, если он там есть. В противно случае записываем универсальный стату ошибки на сервере - 500.
  res.status(err.status || 500);
  // Формируем HTML-текст из шаблона "error.hbs" и отправляем его на клиент в качестве ответа.
  res.render('error');
});

// console.log('develop')

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});

