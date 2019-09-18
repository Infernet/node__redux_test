const {DB_DIALECT, DB_HOST, DB_LOGIN, DB_NAME, DB_PASSWORD} = require("../constants/dataBase");

const user = require('./User');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(DB_NAME, DB_LOGIN, DB_PASSWORD, {
    dialect: DB_DIALECT,
    host: DB_HOST,
    define: {
        timestamps: false
    }
});

const User = user(sequelize, Sequelize);


module.exports = {
    "sequelize": sequelize,
    "DataTypes": Sequelize,
    "User": User,
    'sync': () => {
        sequelize.sync().then(result => {
            console.log(result);
        })
            .catch(err => console.log(err));
    }
};