const db = require('../models/index.model');
module.exports = {
    getCategories: async(req, res) => {
            const categories = await db.Category.findAll();    //findAll array return krta hai [{}, {}]
            return res.json(categories);
        },


  
}