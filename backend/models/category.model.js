'use strict'
module.exports = (sequelize, DataTypes)=>{
    const Category = sequelize.define("Category", {
        CategoryId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            field: 'CategoryId'
        },
        Category_Name: {
            type : DataTypes.STRING,
            field: 'Category_Name',
            allowNull : false,
            required: true
        },
        
        CreatedAt: {
            type: DataTypes.DATE,
            field: 'CreatedAt',
            defaultValue: DataTypes.NOW()
        },
        UpdatedAt: {
            type: DataTypes.DATE,
            field: 'UpdatedAt',
            defaultValue: DataTypes.NOW()
        }             
    },{
        timestamps: true,
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt',
        freezeTableName: false
    });
    Category.associate = function(models) {
       models.Category.belongsToMany(models.Video, {
			through: models.VideoCategory,
			foreignKey:"CategoryId"
		});
    }
    return Category;
}
