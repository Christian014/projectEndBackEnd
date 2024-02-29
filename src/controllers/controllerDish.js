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
        try{
            const dataDishes = await knex.select("*").from("dish")
            

            return res.json(dataDishes)
        }catch{
            console.log("error internal")
        }

        
    }

    async update(req, res){
        try{
            const { id } = req.body
            const { name, description, price, ingredients, category} = req.body
            

            if (!req.file) {
                console.log("nenhum arquivo");
            }
            
            const fileName = req.file.filename
            const diskStorage = new DiskStorage()
            
            const savedFilename = await diskStorage.saveFile(fileName)
            

            const data = await knex("dish").where("id", id)
            .update({
                image: savedFilename,
                name: name,
                category: category,
                description: description,
                price: price,
                ingredients: ingredients
            })

            return res.status(200);
            
        }catch(error){
            console.log(error, "error")
        }
    }

    async delete(req, res){
        try{
            const { id }  = req.params
            await knex("dish").where("id", id).delete()

            res.status(200)
            
        }catch(erro){
            console.log(erro, "erro")
        }
    }
}

module.exports = ControllerDish;