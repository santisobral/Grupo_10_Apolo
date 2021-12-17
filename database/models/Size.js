module.exports = (sequelize, dataTypes) => {
    let alias = 'Size';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        size: {
            type: dataTypes.STRING
        },
        deleted: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'sizes',
        timestamps: false
    };
    const Size = sequelize.define(alias, cols, config);

    // Tablas con las que se relaciona este Modelo
    Size.associate = function(models) {
        Size.hasMany(models.Product,{
            as:"sizes",
            foreignKey:"size_id" // aca pones la foreignKey que tenes en la tabla Product y es a traves de la que haces la relacion
        })
    }

    return Size
}