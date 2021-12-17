module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        lastname: {
            type: dataTypes.STRING
        },
        birthdate: {
            type: dataTypes.DATE
        },
        email: {
            type: dataTypes.STRING
        },
        pass: {
            type: dataTypes.STRING
        },
        role_id:{
            type: dataTypes.INTEGER
        },
        avatar: {
            type: dataTypes.STRING
        },
        deleted: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };
    const User = sequelize.define(alias, cols, config);

     // Tablas con las que se relaciona este Modelo
     User.associate = function(models){
        User.belongsTo(models.Roll,{ // aca el models.Roll es igual al alias del modelo Roll
            as:"roll",
            foreignKey:"role_id"
        })
    }

    return User
}