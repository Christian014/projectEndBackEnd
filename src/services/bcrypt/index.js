const bcrypt = require("bcrypt");

async function  passwordCrypto(password){
    
  const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const compare = await bcrypt.compare(password, passwordHash);

    

    if(!compare){
        console.log("Senha invalida");
        console.log(compare);
    }else{
        console.log("Senha correta");
        console.log(compare);
    }

    console.log( passwordHash);
    return passwordHash
    
}

module.exports = passwordCrypto;