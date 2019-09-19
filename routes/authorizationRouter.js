const express=require('express');
const controller=require('../controllers/authorizationController');

const router=express.Router();

router.post('/login-auth',controller.loginAuth);
router.post('/token-auth',controller.tokenAuth);
router.post('/refresh-token',controller.tokenRefresh);

module.exports=router;