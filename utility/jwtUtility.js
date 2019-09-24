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


exports.validateAccessToken = token => {
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
exports.validateRefreshToken = (userId, refreshToken) => {
    return new Promise(((resolve, reject) => {
        db.UserSession.findOne({where: {UserId: userId, fingerPrint: refreshToken}})
            .then(session => {
                if (session !== null) {
                    let nowTime = Math.floor(new Date().getTime() / 1000);
                    if (nowTime <= session.expiresIn)
                        resolve(JWT_VALID_TOKEN);
                    else
                        reject(JWT_TOKEN_TIME_OUT);
                } else
                    reject(JWT_INVALID_SIGNATURE);
            })
            .catch(reason => reject(JWT_INVALID_SIGNATURE));
    }));
};

exports.getAccessToken = (user) => {
    return jwt.sign(user, privateKey, {algorithm: JWT_ALG, expiresIn: JWT_ACCESS_EXP})
};

exports.setRefreshToken = (userId, fingerPrint) => {
    return new Promise(((resolve, reject) => {
        db.UserSession.findOne({where: {UserId: userId, fingerPrint: fingerPrint}})
            .then(session => {
                if (session !== null)
                    session.destroy()
                        .then(() => {
                            db.UserSession.create({
                                UserId: userId,
                                fingerPrint: fingerPrint,
                                expiresIn: (Math.floor(new Date().getTime() / 1000) + JWT_REFRESH_EXP)
                            })
                                .then(session => resolve(session))
                                .catch(reason => reject(reason));
                        })
                        .catch(reason => reject(reason));
                else
                    db.UserSession.create({
                        UserId: userId,
                        fingerPrint: fingerPrint,
                        expiresIn: (Math.floor(new Date().getTime() / 1000) + JWT_REFRESH_EXP)
                    })
                        .then(session => resolve(session))
                        .catch(reason => reject(reason));
            })
            .catch(reason => reject(reason));
    }))
};

exports.decodeToken = token => {
    let split = token.split('.');
    return {
        header: JSON.parse(atob(split[0])),
        payload: JSON.parse(atob(split[1]))
    }
};
