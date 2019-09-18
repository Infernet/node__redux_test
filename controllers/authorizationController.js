const db = require('../models/index');
const {JWT_VALID_TOKEN} = require("../constants/jwt");
const {JWT_INVALID_SIGNATURE} = require("../constants/jwt");
const {JWT_TOKEN_TIME_OUT} = require("../constants/jwt");
const {validateToken, getAccessToken, getRefreshToken} = require("../utility/jwtUtility");


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
                accessToken: getAccessToken(user),
                refreshToken: getRefreshToken(user)
            });
        })
        .catch(reason => {
            console.log(reason);
            res.sendStatus(400);
        });
};

exports.tokenAuth = (req, res, next) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.slice(7);
        let validResult = validateToken(token);
        switch (validResult.status) {
            case JWT_VALID_TOKEN:
                res.json({accessToken: token});
                break;
            case JWT_TOKEN_TIME_OUT:
                res.sendStatus(401);
                break;
            case JWT_INVALID_SIGNATURE:
                res.sendStatus(400);
                break;
            default:
                res.sendStatus(400);
        }
    } else
        next();
};

exports.tokenRefresh = (req, res, next) => {
    if (req.headers.refresh) {
        let token = req.headers.authorization.slice(7);
        let validResult = validateToken(token);
        switch (validResult.status) {
            case JWT_VALID_TOKEN:
                db.User.findOne({
                    where: {id: validResult.payload.id}
                }).then(user => {
                    res.json({
                        accessToken: getAccessToken(user),
                        refreshToken: getRefreshToken(user)
                    });
                })
                    .catch(reason => res.sendStatus(400));
                break;
            case JWT_TOKEN_TIME_OUT:
                res.sendStatus(401);
                break;
            case JWT_INVALID_SIGNATURE:
                res.sendStatus(400);
                break;
            default:
                res.sendStatus(400);
        }
    } else
        next();
};