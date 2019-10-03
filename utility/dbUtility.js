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

exports.dbClearRefreshTokens=()=>{
    const Op = db.Operations;
    const nowTime = Math.floor(new Date().getTime() / 1000);
    db.UserSession.findAll({
        where: {
            expiresAt: {
                [Op.lte]: nowTime
            }
        }
    })
        .then(sessions => {
            if (sessions !== null && sessions.length !== 0)
                sessions.forEach(e => e.destroy());
        })
        .catch(reason => console.error(reason));
}