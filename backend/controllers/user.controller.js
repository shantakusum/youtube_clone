const db = require('../models/index.model');
const bcrypt = require("bcryptjs");
module.exports =  {
    getUser: async(req, res) => {
        const users = await db.User.findAll();    //findAll array return krta hai [{}, {}]
        return res.json(users);
    },
    getUserById: async (req, res) => {
        console.log("req.params.UserId =", req.params.UserId); 
        try {
            const user = await db.User.findOne({
                where: {
                    UserId: req.params.UserId
                }
            });
            console.log("User:", user);
            return res.json(user);

        } catch (error) {
            return res.status(500).json(error);
        }
    },  
    putUser: async (req, res) => {
        await db.User.update(req.body, {                    // Model.update(values, options);
            where: {    
                UserId: req.params.UserId
            } 
        });
        res.json({
            message: "User updated"
        });
    }, 
    deleteUser: async (req, res) => {
        await db.User.destroy({
            where: {
                UserId: req.params.UserId 
            }
        });
        res.json({
            message: "User deleted"
        });
    }
}