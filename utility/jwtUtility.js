const {} = require("../constants/jwt");
const atob = require('atob');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const {JWT_REFRESH_EXP} = require("../constants/jwt");
const {JWT_ACCESS_EXP} = require("../constants/jwt");
const {JWT_ALG} = require("../constants/jwt");
const {JWT_VALID_TOKEN} = require("../constants/jwt");
const {JWT_INVALID_SIGNATURE} = require("../constants/jwt");
const {JWT_TOKEN_TIME_OUT} = require("../constants/jwt");
const privateKey = fs.readFileSync(__dirname + '/../keys/privateHS256.pem');
const db = require('../models/index');


exports.validateToken = token => {
    try {
        let decode = jwt.verify(token, privateKey);
        return {
            payload: decode,
            status: JWT_VALID_TOKEN
        };
    } catch (error) {
        switch (error.name) {
            case JWT_TOKEN_TIME_OUT:
                return {status: JWT_TOKEN_TIME_OUT};
            default:
                return {status: JWT_INVALID_SIGNATURE};
        }
    }
};

exports.getAccessToken = (user) => {
    return jwt.sign(user, privateKey, {algorithm: JWT_ALG, expiresIn: JWT_ACCESS_EXP})
};
exports.getRefreshToken = (id, fingerPrint) => {
    return new Promise(((resolve, reject) => {
        db.User.findByPk(id)
            .then(user => {
                db.UserSession.findAll({where: {UserId: user.id}})
                    .then(sessions => {
                        sessions.every(session => {
                            if (session.dataValues.fingerPrint === fingerPrint) {
                                session.update({fingerPrint: fingerPrint})
                                    .then(result => resolve(result.fingerPrint))
                                    .catch(reason => reject(reason));
                                return false;
                            }
                        });
                        user.createSession({fingerPrint:fingerPrint})
                            .then(session=>resolve(session.fingerPrint))
                            .catch(reason => reject(reason));
                    })
                    .catch(reason => reject(reason))
            })
            .catch(reason => reject(reason));
    }));
};
exports.decodeToken = token => {
    let split = token.split('.');
    return {
        header: JSON.parse(atob(split[0])),
        payload: JSON.parse(atob(split[1]))
    }
};
