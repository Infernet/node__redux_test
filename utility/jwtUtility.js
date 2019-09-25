const {
    JWT_REFRESH_EXP,
    JWT_ACCESS_EXP,
    JWT_ALG,
    JWT_VALID_TOKEN,
    JWT_INVALID_SIGNATURE,
    JWT_TOKEN_TIME_OUT
} = require("../constants/jwt");
const atob = require('atob');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync(__dirname + '/../keys/privateHS256.pem');
const db = require('../models/index');
const crypto = require('crypto');


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
exports.validateRefreshToken = (refreshToken, fingerPrint) => {
    return new Promise(((resolve, reject) => {
        db.UserSession.findOne({where: {refreshToken: refreshToken, fingerPrint: fingerPrint}})
            .then(session => {
                if (session === null) throw new Error();
                let nowTime = Math.floor(new Date().getTime() / 1000);
                if (nowTime <= session.expiresIn)
                    resolve({status: JWT_VALID_TOKEN, sessionId: session.id});
                else
                    reject(JWT_TOKEN_TIME_OUT);
            })
            .catch(reason => reject(JWT_INVALID_SIGNATURE));
    }));
};

exports.getAccessToken = (user) => {
    return jwt.sign(user, privateKey, {algorithm: JWT_ALG, expiresIn: JWT_ACCESS_EXP})
};

exports.setRefreshToken = (user, fingerPrint) => {
    return new Promise(((resolve, reject) => {
        let currentDate = new Date().getTime();
        let refreshToken = crypto.createHash('sha1')
            .update(currentDate.toString() + (Math.random().toString()) + fingerPrint)
            .digest('hex');
        user.createSession({
            fingerPrint: fingerPrint,
            refreshToken: refreshToken,
            expiresAt: ((currentDate / 1000) + JWT_REFRESH_EXP)
        })
            .then(session => resolve(session.refreshToken))
            .catch(() => reject());
    }))
};

exports.decodeToken = token => {
    let split = token.split('.');
    return {
        header: JSON.parse(atob(split[0])),
        payload: JSON.parse(atob(split[1]))
    }
};
