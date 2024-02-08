
const knexFile = require("../../knexfile")
const knex = require("knex")(knexFile.development);

const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");



class User {
    async createUser(request, response, next){
        const { id } = request.body;
        const {name, email, password} = request.body;

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds)
        
        const compare = await bcrypt.compare(password, passwordHash)

        //para verificar se a senha criptografada e igual a senha
        if(!compare){
            console.log("comparacao esta incorreta");
            console.log(compare);
        }else{
            console.log("correto");
            console.log(compare);
        }

        console.log( passwordHash);
        console.log(name, email, password);


        
        const emailDb = await knex("users").pluck("email")

        //oque eu fiz criei uma constante emailDb e peguei os emails do banco
        //e, fiz uma validação se o email incluindo o email que usuario estiver passando para ser incluso no db estiver la me retorna "email cadastrado"
        console.log(emailDb)
        if(emailDb.includes(email)){
            console.log("email ja cadastrado no db");
            throw new AppError("ja esta cadastrado", 401);
        }


        await knex("users").insert({
               
            name: name,
            email: email, 
            password: passwordHash
        })
        

    }
}

module.exports = User;