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


exports.validateToken = token => {
    try {
        let decode = jwt.verify(token, privateKey);
        return {
            payload: decode.data,
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
exports.getRefreshToken = (user) => {
    return jwt.sign({id: user.id}, privateKey, {algorithm: JWT_ALG, expiresIn: JWT_REFRESH_EXP});
};
exports.decodeToken = token => {
    let split = token.split('.');
    return {
        header: JSON.parse(atob(split[0])),
        payload: JSON.parse(atob(split[1]))
    }
};
