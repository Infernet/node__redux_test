const db = require('../models/index');
const {JWT_INVALID_SIGNATURE} = require("../constants/jwt");
const {JWT_TOKEN_TIME_OUT} = require("../constants/jwt");
const {JWT_VALID_TOKEN} = require("../constants/jwt");
const {validateToken} = require("../utility/jwtUtility");


exports.getUsers = (req, res) => {
    if (!req.body)
        res.sendStatus(400);
    let token = req.body.token;
    let validResult = validateToken(token);
    switch (validResult.status) {
        case JWT_VALID_TOKEN:
            if (validResult.payload.id >= 1)
                db.User.findAll({
                    where: {role: 0},
                    raw: true
                })
                    .then(users => {
                        res.json({users: users});
                    })
                    .catch(reason => res.sendStatus(500));
            else
                res.sendStatus(403);
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
};

exports.insertUser = (req, res) => {
    if (!req.body)
        res.sendStatus(400);
    let token = req.body.token;
    let validResult = validateToken(token);
    switch (validResult.status) {
        case JWT_VALID_TOKEN:
            if (validResult.payload.id >= 1)
                db.User.create(req.body.user)
                    .then(user => {
                        db.User.findAll({raw: true})
                            .then(users => res.json({users: users}))
                            .catch(reason => res.sendStatus(500))
                    })
                    .catch(reason => res.sendStatus(500));
            else
                res.sendStatus(403);
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
};

exports.updateUser = (req, res) => {
    if (!req.body)
        res.sendStatus(400);
    let token = req.body.token;
    let validResult = validateToken(token);
    switch (validResult.status) {
        case JWT_VALID_TOKEN:
            if (validResult.payload.id >= 1)
                db.User.update(req.body.user.data, {where: {id: req.body.user.id}})
                    .then(user => {
                        db.User.findAll({raw: true})
                            .then(users => res.json({users: users}))
                            .catch(reason => res.sendStatus(500));
                    })
                    .catch(reason => res.sendStatus(500));
            else
                res.sendStatus(403);
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
};

exports.deleteUser = (req, res) => {
    if (!req.body)
        res.sendStatus(400);
    let token = req.body.token;
    let validResult = validateToken(token);
    switch (validResult.status) {
        case JWT_VALID_TOKEN:
            if (validResult.payload.id >= 1)
                db.User.destroy({where: {id: req.body.user.id}})
                    .then(user => {
                        db.User.findAll({raw: true})
                            .then(users => res.json({users: users}))
                            .catch(reason => res.sendStatus(500));
                    })
                    .catch(reason => res.sendStatus(500));
            else
                res.sendStatus(403);
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
};
