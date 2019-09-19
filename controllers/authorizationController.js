const db = require('../models/index');
const {JWT_VALID_TOKEN} = require("../constants/jwt");
const {JWT_INVALID_SIGNATURE} = require("../constants/jwt");
const {JWT_TOKEN_TIME_OUT} = require("../constants/jwt");
const {validateToken, getAccessToken, getRefreshToken, decodeToken} = require("../utility/jwtUtility");


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
            let userData = {id: user.id, login: user.login};
            let tokens = {
                accessToken: getAccessToken(userData),
                refreshToken: getRefreshToken({id: userData.id}),
            };
            let accessExpiresIn = decodeToken(tokens.accessToken).payload.exp;
            let response=Object.assign(tokens, userData, {accessExpiresIn: accessExpiresIn});
            res.json(response);
        })
        .catch(reason => {
            console.log(reason);
            res.status(400).json({});
        });
};

exports.tokenAuth = (req, res, next) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.slice(7);
        let validResult = validateToken(token);
        switch (validResult.status) {
            case JWT_VALID_TOKEN:
                db.User.findByPk(validResult.payload.id)
                    .then(user => res.json({id: user.id, login: user.login}))
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

exports.tokenRefresh = (req, res, next) => {
    if (req.headers.refresh) {
        let token = req.headers.refresh.slice(7);
        let validResult = validateToken(token);
        switch (validResult.status) {
            case JWT_VALID_TOKEN:
                /*
                * Разобраться с payload (возвращает undefined)
                *
                * */
                db.User.findByPk(validResult.payload.id)
                    .then(user => {
                    let userData = {id: user.id, login: user.login};
                    let tokens = {
                        accessToken: getAccessToken(userData),
                        refreshToken: getRefreshToken({id: userData.id}),
                    };
                    let accessExpiresIn = decodeToken(tokens.accessToken).payload.expiresIn;
                    res.json(Object.assign(tokens, userData, {accessExpiresIn: accessExpiresIn}));
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