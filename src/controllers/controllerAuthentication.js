const configJwt = require("../config/jwt/index");
const User = require("../controllers/controllersUser");

async function authentication(request, response){
    const {email, password} = request.body
    console.log(email, password);
}
