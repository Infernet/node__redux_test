var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jwt = require('jsonwebtoken');

router.use(function(request, response, next){
    if(request.headers.authorization)
    {
        var publicKey = fs.readFileSync(__dirname + '/../auth/public.pem');
        var token=request.headers.authorization.slice(7);
        console.log(token);
        try {
            var decoded = jwt.verify(token, publicKey);
            response.json({login:decoded.login});
        } catch(err) {
            response.send(err);
        }
    }
    else
        next();
});

/* GET home page. */
router.get('/*', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/login', urlencodedParser, (req, res) => {
        console.log(req.header.message);
        if (!req.body)
            res.sendStatus(400);
        const user = {login: req.body.login};
        const privateKey = fs.readFileSync(__dirname + '/../auth/private.pem');
        const token = jwt.sign(user, privateKey, {algorithm: 'RS256'});
        res.json({
            token: token
        });
});
module.exports = router;