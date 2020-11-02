const bcrypt = require("bcrypt");
const validateUserInput = (email,password)=>{
    return email && password;
};

const comparePassword = (password,hashedPassword)=>{
    return bcrypt.compareSync(password,hashedPassword);
    //doğruysa true yanlışsa false dönecek
}

module.exports = 
{
    validateUserInput,
    comparePassword
};