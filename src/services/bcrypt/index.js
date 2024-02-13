const bcrypt = require("bcrypt");

async function  passwordCrypto(password){
    
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    return passwordHash
    
}



module.exports = passwordCrypto;