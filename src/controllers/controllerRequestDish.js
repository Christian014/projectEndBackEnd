const knexFile = require("../../knexfile")
const knex = require("knex")(knexFile.development);
const AppError = require("../utils/appError");


class ControllerRequestDish{

    async requestDish(req, res){
        try{
            const { id } = req.body
            const response = await knex("dish").where("id", id).first();

            console.log(id)
            return res.json({response})
        }catch{
            res.json("error")
        }
    }
}

module.exports = ControllerRequestDish