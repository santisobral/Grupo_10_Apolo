module.exports = (sequelize, dataTypes) => {
    let alias = 'Roll';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: dataTypes.STRING
        },
        deleted: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'roles',
        timestamps: false
    };
    const Roll = sequelize.define(alias, cols, config);
// Tablas con las que se relaciona este Modelo
    Roll.associate = function(models) {
        Roll.hasMany(models.User,{
            as:"users",
            foreignKey:"role_id" // aca pones la foreignKey que tenes en la tabla User y es a traves de la que haces la relacion
        })
    }

    return Roll
}