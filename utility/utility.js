import {JWT_ALG} from "../constants/jwt";

const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync(__dirname + '/../keys/private.pem');
const publicKey = fs.readFileSync(__dirname + '/../keys/public.pem');


exports.validateToken = (token) => {
    try {
        let decode = jwt.verify(token, publicKey);
        return true;
    } catch (e) {
        return false;
    }
};
exports.getToken = (data) => {
    return jwt.sign(data, privateKey, {algorithm: JWT_ALG});
};
exports.decodeToken = (token) => {
    let split = token.split('.');
    return {
        header: JSON.parse(atob(split[0])),
        payload: JSON.parse(atob(split[1]))
    }
};