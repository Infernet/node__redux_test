const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const db = require('../models/index');
const cors = require('cors');
//Routers
const indexRouter = require('../routes/indexRouter');
const errorRouter = require('../routes/errorRouter');
const authRouter = require('../routes/authorizationRouter');
const usersRouter = require('../routes/usersRouter');

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));


app.use('/', indexRouter);
app.use('/request/login', authRouter);
app.use('/request/user', usersRouter);
app.use('*', errorRouter);


app.listen(process.env.PORT, process.env.HOST, () => {
    console.log('Server mysql&express ready http://' + process.env.HOST + ':' + process.env.PORT);
    //{force:true}
    //db.sync();
});
/*
INSERT INTO `Users` ( `login`, `password`, `role`, `firstName`, `lastName`, `email`) VALUES
( 'max338', 'qwerty', 0, 'Max', 'Petrov', 'test@mail.ru'),
( 'infernet', 'admin', 1, 'Sergey', '', 'infernet@webrocket.pro'),
( 'MetalDaze', '5went29', 0, 'Айрат', 'Андроников', 'gboss@outlook.com'),
( 'Totopoli', '4sign01', 0, 'Яков', 'Угольников', 'rtanter@hotmail.com'),
( 'Nimrodel', '4than86', 0, 'Племянников', 'Максуд', 'rddesign@me.com'),
( 'Eilaia', '4vain05', 0, 'Казанцев', 'Мераб', 'pmint@optonline.net'),
( 'qLostmen', '9ring57', 0, 'Федулов', 'Демьян', 'dinther@live.com');
 */