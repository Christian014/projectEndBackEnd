const knexFile = require("../../knexfile")
const knex = require("knex")(knexFile.development);

const authConfig = require("../config/jwt/auth");
const { sign } = require("jsonwebtoken")

const passwordCrypto = require("../services/bcrypt/index");
const bcrypt = require("bcrypt");

const AppError = require("../utils/appError");


class UserController {

         async createUser(req, res){
            try{

                const {name, email, password} =  req.body;
            
                const emailExistDb = await knex("users").where("email", email).first()

                if(emailExistDb){
                    throw new AppError("email ja esta sendo ultilizado", 401);
                }

                const passwordcrypto = await passwordCrypto(password) 
                    
                    const user = await knex("users")
                    .insert
                    ({
                        name: name,
                        email: email, 
                        password: passwordcrypto

                    })
                    return res.status(200).json({ message: "Usuário criado com sucesso" });

                    

            }catch (error) {
    
                if (error.message.includes("O email já está em uso")) {
                    return res.status(401).json({ message: "O email já está em uso" });
                } else {

                    console.error(error);
                    return res.status(500).json({ message: "Erro interno do servidor" });
                }
            }
            
    
        };

        async loginUser(req, res){
            
                try{
                    const {email, password} = req.body
                    const user = await knex("users").where("email", email).first()

                    if(!user || user === 0){
                        throw new AppError("Email e/ou senha inválido", 401)
                    }
                    
                    const passwordUser = user.password       
                    const passwordIsCorrect = await bcrypt.compare(password, passwordUser);
                    
                    if(!passwordIsCorrect){
                        console.log("Email e/ou senha inválido")
                        throw new AppError("Email e/ou senha inválido", 401);
                    }

                    const { secret, expiresIn } = authConfig.jwt;

                    const token = sign({}, secret, {
                        subject: String(user.id),
                        expiresIn
                    })
                    console.log(user, token);
                    return res.json({user, token});

                }catch{
                    
                    res.status(401).json({message: "Email e/ou senha Inválido"});
                }

        }

    }

module.exports = UserController;