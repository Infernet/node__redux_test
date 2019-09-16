const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const logger = require('morgan');

const app=express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));
//Routers
const indexRouter=require('../routes/indexRouter');
const errorRouter=require('../routes/errorRouter');
const postRouter=require('../routes/postRouter');

app.use('/',indexRouter);
app.use('/request',postRouter);
app.use('*',errorRouter);





app.listen(process.env.PORT, process.env.HOST, () => {
    console.log('Server mysql&express ready http://' + process.env.HOST + ':' + process.env.PORT);
});