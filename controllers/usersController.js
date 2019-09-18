const db = require('../models/index');
const {validateToken, decodeToken} = require("../utility/jwtUtility");


exports.getUsers = (req, res) => {
    validate=validateToken(req.body.token,req,res);
    if (validate.status) {
        let decode=decodeToken(req.body.token);
        let user = decode.payload;
        db.User.findOne({
            where: {id: user.id},
            raw: true
        })
            .then(user => {
                if (user.role < 1)
                    throw new Error();
                db.User.findAll()
                    .then(response => {
                        res.json({users: response});
                    })
                    .catch(reason => {
                        res.status(400).send(reason);
                    });
            })
            .catch(reason => res.sendStatus(400));
    }
    else
        res.json(validate.error);
};

exports.insertUser = (req, res) => {
    if (validateToken(req.body.token)) {
        let user = decodeToken(req.body.token).payload;
        db.User.findOne({
            where: {id: user.id},
            raw: true
        })
            .then(user => {
                if (user.role < 1)
                    throw new Error();
                db.User.create(req.body.data)
                    .then(response => {
                        db.User.findAll()
                            .then(users => res.json({users: users}))
                            .catch(reason => res.sendStatus(400))
                    })
                    .catch(reason => res.sendStatus(400));
            })
    } else
        res.sendStatus(504);
};

exports.updateUser = (req, res) => {
    res.sendStatus(504);
};

exports.deleteUser = (req, res) => {
    res.sendStatus(504);
};
