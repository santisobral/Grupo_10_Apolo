module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.INTEGER
        },
        brand: {
            type: dataTypes.STRING
        },
        size_id: {
            type: dataTypes.INTEGER
        },
        category_id:{
            type: dataTypes.INTEGER
        },
        discount: {
            type: dataTypes.INTEGER
        },
        image: {
            type: dataTypes.STRING
        },
        gender: {
            type: dataTypes.STRING
        },
        deleted: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false
    };
    const Product = sequelize.define(alias, cols, config);
    // Tablas con las que se relaciona este Modelo
    Product.associate = function(models){
        Product.belongsTo(models.Size,{ // aca el models.Size es igual al alias del modelo Size
            as:"size",
            foreignKey:"size_id"
        })
        Product.belongsTo(models.Category,{ 
            as:"category",
            foreignKey:"category_id"
        })

    }

    return Product
}