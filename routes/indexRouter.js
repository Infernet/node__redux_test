const express=require('express');
const controller=require('../controllers/indexController');
const indexRouter=express.Router();

indexRouter.get('/',controller.home);


module.exports=indexRouter;