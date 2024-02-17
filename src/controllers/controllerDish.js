const knexFile = require("../../knexfile")
const knex = require("knex")(knexFile.development);

const DiskStorage = require("../providers/diskStorage");

class ControllerDish{
    async create(req, res){
        
        
        const { name, description, category, price } = req.body
        
        if (!req.file) {
            console.log("nenhum arquivo");
        }
        
        const fileName = req.file.filename
        const diskStorage = new DiskStorage()

        

        const savedFilename = await diskStorage.saveFile(fileName)
        const insertDish = await knex("dish")
        .insert({
            image: savedFilename,
            name: name,
            price: price,
            category: category,
            description: description
        })
        


        res.json({insertDish})
    }
}

module.exports = ControllerDish;