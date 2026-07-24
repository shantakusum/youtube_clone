'use strict'
module.exports = (sequelize, DataTypes)=>{
    const Video = sequelize.define("Video", {
        VideoId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            field: 'VideoId'
        },
        Title: {
            type : DataTypes.STRING,
            field: 'Title',
            allowNull : false,
            required: true
        },
        VideoType: {
            type : DataTypes.STRING,
            field: 'VideoType',
            enum : ['vod','live'],
            default : 'vod',
            allowNull : true,
            required: false,
        },
        Description: {
            type: DataTypes.STRING,
            field: 'Description',
            required: false
        },
        Video_url: {
            type: DataTypes.STRING,
            field: 'Video_url' ,
            required: true
        },
        Thumbnail_url: {
            type: DataTypes.STRING,
            field: 'Thumbnail_url',
            allowNull: true,
            required: false
        },
        Duration: {
            type: DataTypes.INTEGER,
            field: 'Duration',
            allowNull: true,
            required: false
        },
        Uploaded_by: {
            type: DataTypes.STRING,
            field: 'Uploaded_by',
            required: false
        },
        Views: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: "Views"
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
    
    Video.associate = function(models) {
        models.Video.hasMany(models.Comment,{
            onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
			foreignKey: 'VideoId',
			constraints: false
        })
        models.Video.belongsToMany(models.Category, {
			through: models.VideoCategory,
			foreignKey:"VideoId"
		});
    }
    return Video;
}
