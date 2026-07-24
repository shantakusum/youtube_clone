const db = require('../models/index.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
module.exports =  {
        register: async(req, res) => {
            try{
                const{ FullName, UserName, UserEmail, Password, Phone, Dob, Role } = req.body;
                const hashedPassword = await bcrypt.hash(Password, 10);
                const user = await db.User.create({  
                    FullName,                // database me new record create krta hai ek object return krta hai 
                    UserName,
                    UserEmail, 
                    Password: hashedPassword, 
                    Phone, 
                    Dob,
                    Role
                });
                res.json(user);
            }catch(err){
                console.log(err);
            }   
        },
        login: async(req, res) => {
            try{
                const{ UserEmail, Password, Role } = req.body;
                const user = await db.User.findOne({                //findOne only ek object {} return krta hai 
                    where:{
                        UserEmail: UserEmail
                    }
                })
                if(!user){
                    return res.status(404).json({
                        message: "user not found"
                    })
                } 
                 // password check
                const isMatch = await bcrypt.compare(
                    Password,
                    user.Password   //hashed password
                );                                                                  // true or false
                if (!isMatch) {
                    return res.send("Invalid password");
                }
                // JWT token
                const token = jwt.sign(
                    {
                        Email: user.UserEmail,
                        Role: user.Role
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1d"
                    }
                );
                // success
                res.json({
                    message: "Login successful",
                    token,
                    user
                });
            }catch(error){
                return res.status(500).json({
                    message: error
                })
            }
        },
        checkEmail: async(req, res) => {
                try {
                const { UserEmail } = req.body;
        
                const user = await db.User.findOne({
                    where: {
                        UserEmail: UserEmail
                    }
                });
                 console.log("USER:", user);
                if (!user) {
                    return res.status(404).json({
                        message: "Email does not exist"
                    });
                }
                return res.status(200).json({
                    message: "Email exists"
                });
        
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Server error"
                });
            }
         }
}