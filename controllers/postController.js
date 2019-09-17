const db = require('../models/index');
const {validateToken, getToken} = require("../utility/utility");


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
            res.json({
                token: getToken(user)
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
        if (validateToken(token))
            res.json({token: token});
        else
            res.sendStatus(400);
    } else
        next();
};

