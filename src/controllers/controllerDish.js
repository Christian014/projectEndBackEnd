const knexFile = require("../../knexfile")
const knex = require("knex")(knexFile.development);
const AppError = require("../utils/appError")

const DiskStorage = require("../providers/diskStorage");

class ControllerDish{
    async create(req, res){
        
        try{
            const { name, description, category, ingredients, price } = req.body
        
        if (!req.file) {
            console.log("nenhum arquivo");
        }
        
        const fileName = req.file.filename
        const diskStorage = new DiskStorage()
        
        const savedFilename = await diskStorage.saveFile(fileName)
        await knex("dish")
        .insert({
            image: savedFilename,
            name: name,
            price: price,
            category: category,
            ingredients: ingredients,
            description: description
        })

        return res.status(200).json({message: "cadastrado com sucesso"});
        
        }catch(error){
            console.log(error)
        }
    }

    async getAll(req, res){
        const dataDishes = await knex.select("*").from("dish")
    }
}

module.exports = ControllerDish;