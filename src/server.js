require("express-async-errors");
const AppError = require("../src/utils/appError");
const ensureAuthenticated = require("./middlewares/ensureAuthenticated");

const uploadConfig = require("./config/upload")
const UserController = require("./controllers/controllersUser");
const userController = new UserController()
const multer = require("multer");
const ControllerDish = require("./controllers/controllerDish");
const controllerDish = new ControllerDish();
const ControllerPreViewDish = require("./controllers/controllerPreviewDish");
const controllerPreViewDish = new ControllerPreViewDish();


const upload = multer(uploadConfig.MULTER)
const express = require ("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/dish", express.static(uploadConfig.UPLOADS_FOLDER))

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

app.post("/dish", upload.single("image"), controllerDish.create);
app.get("/dish", controllerDish.getAll);

app.post("/dishPreView", controllerPreViewDish.previewDish);

app.listen(PORT);