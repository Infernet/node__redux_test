const db = require('../models/index');

exports.dbGetUsers = () => {
    return new Promise((resolve, reject) => {
        db.User.findAll()
            .then(users => {
                let response = {
                    users: users.map(e => {
                        return {
                            id: e.id,
                            login: e.login,
                            role: e.role,
                            email: e.email,
                            firstName: e.firstName,
                            lastName: e.lastName
                        }
                    })
                };
                resolve(response);
            })
            .catch(reason => reject(reason))
    })
};