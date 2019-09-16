const express=require('express');
const controller=require('../controllers/errorController');
const router=express.Router();

router.get('/',controller.pageNotFound);


module.exports=router;