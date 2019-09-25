const db = require('../models/index');
const {JWT_VALID_TOKEN} = require("../constants/jwt");
const {JWT_INVALID_SIGNATURE} = require("../constants/jwt");
const {JWT_TOKEN_TIME_OUT} = require("../constants/jwt");
const {
    setRefreshToken,
    validateRefreshToken,
    getAccessToken,
    validateAccessToken,
    decodeToken
} = require("../utility/jwtUtility");


exports.loginAuth = (req, res) => {
    if (!req.body) res.sendStatus(400);
    let userData, accessToken;
    db.User.findOne({
        where: {
            login: req.body.login,
            password: req.body.password
        }, raw: true
    })
        .then(user => {
            userData = {id: user.id, login: user.login, role: user.role};
            accessToken = getAccessToken(userData);
            return setRefreshToken(user, req.body.fingerPrint);
        })
        .then(refreshToken => {
            let tokens = {accessToken: accessToken, refreshToken: refreshToken};
            let response = {user: userData, token: tokens};
            res.json(response);
        })
        .catch(reason => res.sendStatus(400));
};

exports.tokenAuth = (req, res) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.slice(7);
        let validResult = validateAccessToken(token);
        switch (validResult.status) {
            case JWT_VALID_TOKEN:
                db.User.findByPk(validResult.payload.id)
                    .then(user => res.json({user: {id: user.id, login: user.login, role: user.role}}))
                    .catch(reason => res.sendStatus(400));
                break;
            case JWT_TOKEN_TIME_OUT:
                res.sendStatus(401);
                break;
            default:
                res.sendStatus(400);
        }
    } else
        res.sendStatus(400);
};

exports.refreshAccessToken = (req, res) => {
    if (!req.headers.authorization || !req.body)
        res.sendStatus(400);
    let refreshToken = req.headers.authorization.slice(7);
    let userId, accessToken;
    validateRefreshToken(refreshToken, req.body.fingerPrint)
        .then(resolve => {
            return db.UserSession.findByPk(resolve.sessionId)
        })
        .then(session => {
            userId = session.UserId;
            return session.destroy();
        })
        .then(() => {
            return db.User.findByPk(userId);
        })
        .then(user => {
            accessToken = getAccessToken({id: user.id, login: user.login, role: user.role});
            return setRefreshToken(user, req.body.fingerPrint);
        })
        .then(refreshToken => {
            if (!accessToken && !refreshToken) throw new Error();
            res.json({accessToken: accessToken, refreshToken: refreshToken});
        })
        .catch(reason => {
            if (reason.status)
                switch (reason.status) {
                    case JWT_TOKEN_TIME_OUT:
                    case JWT_INVALID_SIGNATURE:
                        res.sendStatus(401);
                        break;
                    default:
                        res.sendStatus(400);
                }
            else
                res.sendStatus(400);
        });
};

exports.signOut = (req, res) => {
    if (req.headers.access && req.headers.refresh) {
        try {
            let access = decodeToken(req.headers.access.slice(7));
            let refresh = req.headers.refresh.slice(7);
            db.UserSession.findOne({where: {UserId: access.payload.id, fingerPrint: refresh}})
                .then(session => {
                    session.destroy()
                        .then(() => res.sendStatus(200))
                        .catch(() => res.sendStatus(401));
                })
                .catch(() => res.sendStatus(401));
        } catch (e) {
            res.sendStatus(400);
        }
    } else
        res.sendStatus(400);
};