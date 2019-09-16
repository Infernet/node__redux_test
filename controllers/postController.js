const jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require('../models/index');

const privateKey = fs.readFileSync(__dirname + '/../keys/private.pem');
const publicKey = fs.readFileSync(__dirname + '/../keys/public.pem');

exports.loginAuth = (req, res) => {
    if (!req.body)
        res.sendStatus(400);
    db.User.findOne({
        where: {
            login: req.body.login,
            password: req.body.password
        }, raw: true
    })
        .then(user => {
            let result = {
                id: user.id,
                login: user.login,
                firstName: user.firstName,
                lastName: user.LastName,
                email: user.email
            };
            const token = jwt.sign(result, privateKey, {algorithm: "RS256"});
            res.json({
                token: token
            });
        })
        .catch(reason => {
            console.log(reason);
            res.sendStatus(400);
        });
};

exports.tokenAuth = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.slice(7);
        try {
            const decoded = jwt.verify(token, publicKey);
            res.json({login: decoded.login});
        } catch (err) {
            res.sendStatus(400);
        }
    } else
        next();
};