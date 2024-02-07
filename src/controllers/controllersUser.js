const knexFile = require("../../knexfile")
const knex = require("knex")(knexFile.development);

const bcrypt = require("bcrypt");


class User {
    async createUser(request, response){
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

        await knex("users").insert({
           
            name: name,
            email: email, 
            password: passwordHash
        })
    }
}

module.exports = User;