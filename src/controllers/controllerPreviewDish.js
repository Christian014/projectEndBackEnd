const knexFile = require("../../knexfile")
const knex = require("knex")(knexFile.development);
const AppError = require("../utils/appError");


class ControllerPreViewDish{

    async previewDish(req, res){
        try{
            const { id } = req.body
            console.log(id)
            const response = await knex("dish").where("id", id).first();

            return res.json({response})
        }catch{
            res.json("error")
        }
    }
}

module.exports = ControllerPreViewDish