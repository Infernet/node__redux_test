const user = require('./User');

const Sequelize = require("sequelize");
const sequelize = new Sequelize("react", "infernet", "admin", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
});

var User = user(sequelize, Sequelize);


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