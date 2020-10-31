const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClinet} = require("../helpers/authorization/tokenHelpers");
const { request } = require("express");


const register = asyncErrorWrapper( async (req, res, next) => {
    
    const {name,email,password,role} = req.body;    
    // const name = "Aslı Ceylan";
    // const email = "asli32@yandex.com";
    // const password = "123";

        //async-await
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        sendJwtToClinet(user,res);

        //Buranın Yerine authorization kısmını kullanıyoruz
        // const token = user.generateJwtFromUser();
        // console.log(token);
    
        // res
        // .status(200)
        // .json({
        //     success:true,
        //     data : user
        // });
});

const tokentest = (req,res,next)=>{
    res.json({
        succes:true,
        message:"welcome"
    })
}


module.exports = {
    register,
    tokentest 
}