const db = require("../models/index.model");
const bcrypt = require("bcryptjs");

module.exports ={

    checkEmail: async (req, res) => {
        try {
        const { UserEmail } = req.body;

        const user = await db.User.findOne({
            where: {
                UserEmail: UserEmail
            }
        });

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