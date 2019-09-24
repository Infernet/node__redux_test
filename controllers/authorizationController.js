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
    if (!req.body)
        res.sendStatus(400);
    db.User.findOne({
        where: {
            login: req.body.login,
            password: req.body.password
        }, raw: true
    })
        .then(user => {
            if(user!==null) {
                let userData = {id: user.id, login: user.login, role: user.role};
                let accessToken = getAccessToken(userData);
                setRefreshToken(user.id, req.body.fingerPrint)
                    .then(resolve => {
                        let tokens = {
                            accessToken: accessToken,
                            refreshToken: resolve.fingerPrint,
                            accessExpiresIn: decodeToken(accessToken).payload.exp
                        };
                        let response = Object.assign(tokens, userData);
                        res.json(response);
                    })
                    .catch(reason => {
                        res.status(400).json({});
                    });
            }
            else
                res.status(400).json({});
        })
        .catch(reason => {
            console.log(reason);
            res.status(400).json({});
        });
};

exports.tokenAuth = (req, res) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.slice(7);
        let validResult = validateAccessToken(token);
        switch (validResult.status) {
            case JWT_VALID_TOKEN:
                db.User.findByPk(validResult.payload.id)
                    .then(user => res.json({id: user.id, login: user.login, role: user.role}))
                    .catch(reason => res.sendStatus(400));
                break;
            case JWT_TOKEN_TIME_OUT:
            case JWT_INVALID_SIGNATURE:
                res.sendStatus(401);
                break;
            default:
                res.sendStatus(400);
        }
    } else
        res.sendStatus(400);
};

exports.refreshAccessToken = (req, res) => {
    if (req.headers.refresh && req.headers.userid) {
        let token = req.headers.refresh.slice(7);
        let userId = req.headers.userid;
        validateRefreshToken(userId, token)
            .then(status => {
                if (status === JWT_VALID_TOKEN)
                    db.User.findByPk(userId)
                        .then(user => {
                            let accessToken = getAccessToken({id: user.id, login: user.login, role: user.role});
                            let accessExpiresIn = decodeToken(accessToken).payload.expiresIn;
                            res.json({accessToken: accessToken, accessExpiresIn: accessExpiresIn});
                        })
                        .catch(reason => res.sendStatus(400));
                else throw new Error(JWT_INVALID_SIGNATURE);
            })
            .catch(status => {
                switch (status) {
                    case JWT_TOKEN_TIME_OUT:
                    case JWT_INVALID_SIGNATURE:
                        res.sendStatus(401);
                        break;
                    default:
                        res.sendStatus(400);
                }
            });
    } else
        res.sendStatus(400);
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