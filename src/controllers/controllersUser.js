const knexFile = require("../../knexfile")
const knex = require("knex")(knexFile.development);
const passwordCrypto = require("../services/bcrypt/index")


         async function createUser(req){

            const {name, email, password} =  req.body;
            console.log(name, email, password)
            const passwordcrypto = await passwordCrypto(password)        
    
             await knex("users").insert({
                name: name,
                email: email, 
                password: passwordcrypto
            })
    
        }



module.exports = createUser;