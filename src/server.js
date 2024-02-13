require("express-async-errors");
const AppError = require("../src/utils/appError");

const createUser = require("./controllers/controllersUser");
const loginUser = require("./controllers/controllersUser").loginUser;

const UserController = require("./controllers/controllersUser");
const userController = new UserController()

const express = require ("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use((error, req, res, next) => {
    if(error instanceof AppError){
        return res.status(error.statuscode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error)

    return res.status(500).json({
        status: "error",
        message: "internal server error"
    })
});

const PORT = 3333;

app.get("/", (req, res) => {
    res.send(`api rodando na porta: ${PORT}`)
});

app.post("/register",(req, res) => {userController.createUser(req, res)});

app.post("/login", (req, res) => {userController.loginUser(req, res)});

app.listen(PORT);