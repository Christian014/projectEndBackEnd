const knexFile = require("../../knexfile")
const knex = require("knex")(knexFile.development);

const AppError = require("../utils/appError");
const passwordCrypto = require("../services/bcrypt/index")

class User {
    async createUser(request, response){

        const {name, email, password} = request.body;
        const passwordcrypto = await passwordCrypto(password)

        const emailDb = await knex("users").pluck("email")
        if(emailDb.includes(email)){
            console.log("email ja cadastrado");
            throw new AppError("email ja cadastrado", 401);
        }

        

         await knex("users").insert({
            name: name,
            email: email, 
            password: passwordcrypto
        })
    }
    //att
    //delete
    //ver
}

module.exports = User;