'use strict'
module.exports = (sequelize, DataTypes)=>{
    const Comment = sequelize.define("Comment", {
        CommentId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            field: 'CommentId'
        },

        VideoId: {
            type: DataTypes.STRING,
            allowNull: false
        },

        UserId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        ParentCommentId: {
            type: DataTypes.STRING,
            allowNull: true
        },

        Comment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        Dislikes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
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
    })

    Comment.associate = function(models) {
        models.Comment.belongsTo(models.User,{
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: 'UserId',
            constraints: false
        })
        models.Comment.belongsTo(models.Video,{
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: 'VideoId',
            constraints: false
        })
        models.Comment.hasMany(models.Comment,{
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: 'ParentCommentId',
            constraints: false,
            as: 'Replies'
        })
        models.Comment.belongsTo(models.Comment,{
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            foreignKey: 'ParentCommentId',
            constraints: false,
            as: 'Parent'
        })
    }

    return Comment;
}
