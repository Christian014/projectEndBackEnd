//para tratar exessoes, errors
require("express-async-errors");

const AppError = require("../src/utils/appError");

const User = require("./controllers/controllersUser");
const userController = new User();

const express = require ("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json())

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

app.post("/register", async(req, res) => {
    try{
        const {name, email, password } = req.body;
        await userController.createUser({ body: { name, email, password } }, res);
        res.status(201).send('Usuário criado com sucesso');
    }catch (error) {
        console.error(error); // Imprime o erro no console
        res.status(500).send('Erro ao criar usuário');
    }
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
  })