require("express-async-errors");
const knexFile = require("../knexfile")
const knex = require("knex")(knexFile.development);
const bcrypt = require("bcrypt");
const authConfig = require("./config/jwt/auth");
const { sign } = require("jsonwebtoken");

const AppError = require("../src/utils/appError");

const createUser = require("./controllers/controllersUser");

const express = require ("express");
const cors = require("cors");


const app = express();



app.use(cors());
app.use(express.json());



app.use((error, request, response, next) => {
    if(error instanceof AppError){
        return response.status(error.statuscode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error)

    return response.status(500).json({
        status: "error",
        message: "internal server error"
    })
});


const PORT = 3333;

app.get("/", (req, res) => {
    res.send(`api rodando na porta: ${PORT}`)
});

app.post("/register",(req) => {createUser(req)});

app.post("/login", async(req, res) => {
    try{
        const {email, password} = req.body
        const user = await knex("users").where("email", email)

        if(!user || []){
            throw new AppError("email e/ou senha invalido", 401)
        }

        const emailUser = user[0].email
        const passwordUser = user[0].password
    

       const passwordIsCorrect = await bcrypt.compare(password, passwordUser);
       console.log(passwordIsCorrect)
       console.log(emailUser.includes(email))

        
        if(passwordIsCorrect && emailUser.includes(email)){
            console.log("login")
        }else{
            console.log("nadad e login pra vc")
        }

        return console.log("login sucess")
       
    }catch{
        
    }
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
  })