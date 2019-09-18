const express=require('express');
const controller=require('../controllers/usersController');
const bodyParser=require('body-parser');

const urlencodedParser = bodyParser.urlencoded({extended: false});
const router=express.Router();

router.post('/get',urlencodedParser,controller.getUsers);
router.post('/insert',urlencodedParser,controller.insertUser);
router.post('/update',urlencodedParser,controller.updateUser);
router.post('/delete',urlencodedParser,controller.deleteUser);

module.exports=router;