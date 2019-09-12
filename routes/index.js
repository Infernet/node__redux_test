var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var router = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jwt = require('jsonwebtoken');


/* GET home page. */
router.get('/*', function (req, res, next) {
    // var publicKey = fs.readFileSync(__dirname + '/../auth/public.pem');
    // var privateKey = fs.readFileSync(__dirname + '/../auth/private.pem');
    // var token = jwt.sign({"hello": "world"}, privateKey, {algorithm: 'RS256'});
    // var decoded = jwt.verify(token, publicKey);
    //
    //
    // res.json(decoded);
    // //res.send(`<p>${token}</p><br><p>${decoded.hello}</p>`);

    res.render('index', {title: 'Express'});
});

router.post('/login', urlencodedParser, (req, res) => {
    console.log(req.header.message);
    if (!req.body)
        res.sendStatus(400);
    const user={login:req.body.login};
    const privateKey = fs.readFileSync(__dirname + '/../auth/private.pem');
    const token=jwt.sign(user,privateKey,{algorithm: 'RS256'});
    res.json({
        token:token
    });
});
// router.post('/login', urlencodedParser, (req, res) => {
//     // let min = 1;
//     // let max = 1000000;
//     // let token = Math.floor(Math.random() * (max - min + 1)) + min;
//     // if (req.body.login && req.body.password)
//     //     res.json({
//     //         token: token
//     //     });
//     // else
//     //     res.sendStatus(400);
// });


module.exports = router;
