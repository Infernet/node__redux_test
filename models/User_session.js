module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('User_session', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        fingerPrint:{
         type:DataTypes.STRING,
         allowNull:false
        },
        expiresIn:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    }, {
        timestamps: false
    });
}