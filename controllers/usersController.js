const db = require('../models/index');
const {dbGetUsers} = require("../utility/dbUtility");
const {validateAccessToken} = require("../utility/jwtUtility");
const {JWT_INVALID_SIGNATURE} = require("../constants/jwt");
const {JWT_TOKEN_TIME_OUT} = require("../constants/jwt");
const {JWT_VALID_TOKEN} = require("../constants/jwt");


exports.getUsers = (req, res) => {
    if (!req.headers.authorization)
        res.sendStatus(400);
    let token = req.headers.authorization.slice(7);
    let validResult = validateAccessToken(token);
    switch (validResult.status) {
        case JWT_VALID_TOKEN:
            if (validResult.payload.role < 1)
                res.sendStatus(400);
            dbGetUsers()
                .then(response => res.json(response))
                .catch(reason => res.sendStatus(400));
            break;
        case JWT_TOKEN_TIME_OUT:
        case JWT_INVALID_SIGNATURE:
            res.sendStatus(401);
            break;
        default:
            res.sendStatus(400);
    }
};

exports.insertUser = (req, res) => {
    if (!req.headers.authorization || !req.body)
        res.sendStatus(400);
    let token = req.headers.authorization.slice(7);
    let validResult = validateAccessToken(token);
    switch (validResult.status) {
        case JWT_VALID_TOKEN:
            if (validResult.payload.role < 1)
                res.sendStatus(400);
            db.User.create(req.body.user)
                .then(() => {
                    return dbGetUsers()
                })
                .then(response => res.json(response))
                .catch(reason => res.sendStatus(400));
            break;
        case JWT_TOKEN_TIME_OUT:
        case JWT_INVALID_SIGNATURE:
            res.sendStatus(401);
            break;
        default:
            res.sendStatus(400);
    }
};

exports.updateUser = (req, res) => {
    if (!req.headers.authorization || !req.body)
        res.sendStatus(400);
    let token = req.headers.authorization.slice(7);
    let validResult = validateAccessToken(token);
    switch (validResult.status) {
        case JWT_VALID_TOKEN:
            if (validResult.payload.role < 1)
                res.sendStatus(400);
            db.User.update(req.body.user.data, {where: {id: req.body.user.id}})
                .then(() => {
                    return db.User.findAll({where: {role: 0}, raw: true})
                })
                .then(() => {
                    return dbGetUsers()
                })
                .then(response => res.json(response))
            break;
        case JWT_TOKEN_TIME_OUT:
        case JWT_INVALID_SIGNATURE:
            res.sendStatus(401);
            break;
        default:
            res.sendStatus(400);
    }
};

exports.deleteUser = (req, res) => {
    if (!req.headers.authorization || !req.body)
        res.sendStatus(400);
    let token = req.headers.authorization.slice(7);
    let validResult = validateAccessToken(token);
    switch (validResult.status) {
        case JWT_VALID_TOKEN:
            if (validResult.payload.role < 1)
                res.sendStatus(400);
            db.User.destroy({where: {id: req.body.user.id}})
                .then(() => {
                    return dbGetUsers()
                })
                .then(response => res.json(response))
                .catch(reason => res.sendStatus(400));
            break;
        case JWT_TOKEN_TIME_OUT:
        case JWT_INVALID_SIGNATURE:
            res.sendStatus(401);
            break;
        default:
            res.sendStatus(400);
    }
};
