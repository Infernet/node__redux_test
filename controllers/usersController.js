const db = require('../models/index');
const {validateToken, decodeToken} = require("../utility/utility");


exports.getUsers = (req, res) => {
    if (validateToken(req.body.token)) {
        let user = decodeToken(req.body.token).payload;
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
};

exports.insertUser = (req, res) => {
    if (validateToken(req.body.token)) {
        let user = decodeToken(req.body.token).payload;
        db.User.findOne({
            where: {id: user.id},
            raw: true
        })
            .then(user=>{
                if(user.role<1)
                    throw new Error();
                db.User.create(req.body.data)
                    .then(response=>{

                    })
                    .catch(reason => {

                    });

            })
    }
    res.sendStatus(504);
};

exports.updateUser = (req, res) => {
    res.sendStatus(504);
};

exports.deteleUser = (req, res) => {
    res.sendStatus(504);
};
