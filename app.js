const express = require('express'); // подключаем Express.js
const mongoose = require('mongoose'); // подключаем mongoose
const bodyParser = require('body-parser');
const path = require('path');  // подключем модуль для работы с путями
const postRouter = require('./routes/post');
const keys = require('./keys');

const port = process.env.PORT || 5000; // выбираем порт по умолчанию или 5000
const clientPath = path.join(__dirname, 'client'); // абсолютный путь до папки client

mongoose.connect(keys.mongoURI)
    .then( () => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const app = express(); // отвечает за приложение
app.use(bodyParser.json());
app.use('/api/post', postRouter);
app.use(express.static(clientPath)); // делаем папку client статической

app.listen(port, () => { // прослушка сервера
    console.log(`Server has been started on port ${port}`);
});