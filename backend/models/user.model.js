'use strict'
module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define("User", {
        UserId: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            field: 'UserId'
        },
        FullName: {
            type : DataTypes.STRING,
            field: 'FullName',
            allowNull : false,
            required: true
        },
        UserName: {
            type : DataTypes.STRING,
            field: 'UserName',
            allowNull : false,
            required: true
        },
        UserPic: {
            type: DataTypes.STRING,
            field: 'UserPic',
            required: false
        },
        Gender: {
            type: DataTypes.STRING,
            field: 'Gender' ,
            enum: ["male", "female", "other"],
            required: false
        },
        UserEmail: {
            type: DataTypes.STRING,
            field: 'UserEmail',
            allowNull: false,
            required: true
        },
        Password: {
            type: DataTypes.STRING,
            field: 'Password',
            allowNull: false,
            required: true
        },
        Phone: {
            type: DataTypes.STRING,
            field: 'Phone',
            allowNull: false,
            required: true
        },
        Dob: {
            type: DataTypes.DATE,
            field: 'Dob',
            required: true
        },
        Role: {
            type : DataTypes.STRING,
            enum: ["admin", "user"],
            defaultValue: "user",
            required: true,
            field: 'Role'
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

    User.associate = function(models) {
        models.User.hasMany(models.Comment,{
            onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
			foreignKey: 'UserId',
			constraints: false
        })
    }

    return User;
}
