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
        refreshToken:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: 'index_unique_refreshToken'
        },
        expiresAt:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    }, {
        timestamps: false
    });
}