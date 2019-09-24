const {DB_DIALECT, DB_HOST, DB_LOGIN, DB_NAME, DB_PASSWORD} = require("../constants/dataBase");

const user = require('./User');
const user_session=require('./User_session');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(DB_NAME, DB_LOGIN, DB_PASSWORD, {
    dialect: DB_DIALECT,
    host: DB_HOST,
    define: {
        timestamps: false
    }
});

const User = user(sequelize, Sequelize);
const UserSession=user_session(sequelize,Sequelize);


User.hasMany(UserSession,{as:"Session"});
module.exports = {
    "sequelize": sequelize,
    "DataTypes": Sequelize,
    "User": User,
    "UserSession":UserSession,
    'sync': (forse) => {
        sequelize.sync(forse).then(result => {
            console.log(result);
        })
            .catch(err => console.log(err));
    }
};