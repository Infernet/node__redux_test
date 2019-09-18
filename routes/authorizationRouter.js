const express=require('express');
const controller=require('../controllers/authorizationController');
const bodyParser=require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended: false});
const router=express.Router();

router.post('/login',urlencodedParser,controller.loginAuth);
router.post('/token',urlencodedParser,controller.tokenAuth);

module.exports=router;