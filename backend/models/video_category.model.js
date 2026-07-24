'use strict'
module.exports = (sequelize, DataTypes)=>{
    const VideoCategory = sequelize.define("VideoCategory", {
        VideoCategoryId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            field: 'VideoCategoryId'
        },
        VideoId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'VideoId',
            required: true
        },
        CategoryId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'CategoryId',
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
    
    VideoCategory.associate = function(models) {
        models.VideoCategory.belongsTo(models.Category, {
			foreignKey: "CategoryId"
		});
		models.VideoCategory.belongsTo(models.Video, {
			foreignKey: "VideoId"
		});

    }
    return VideoCategory;
}
