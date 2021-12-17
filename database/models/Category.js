module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        deleted: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'categories',
        timestamps: false
    };
    const Category = sequelize.define(alias, cols, config);

    // Tablas con las que se relaciona este Modelo
    Category.associate = function(models) {
        Category.hasMany(models.Product,{
            as:"categories",
            foreignKey:"category_id" // aca pones la foreignKey que tenes en la tabla Product y es a traves de la que haces la relacion
        })
    }

    return Category
}