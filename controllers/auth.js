const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClinet} = require("../helpers/authorization/tokenHelpers");
const {validateUserInput,comparePassword} = require("../helpers/input/inputHelpers");
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

const login = asyncErrorWrapper( async (req, res, next) => {
    const {email, password} = req.body;
    if(!validateUserInput(email,password))
    {
        return next(new CustomError("Please check your input",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!comparePassword(password,user.password))
    {
        return next(new CustomError("please check your credentials",400));
    }

    sendJwtToClinet(user,res);

});

const logout = asyncErrorWrapper(async(req,res,next)=>{
    const{NODE_ENV} = process.env;
    return res.status(200).cookie({
        httpOnly:true,
        expires:new Date(Date.now()),
        secure:NODE_ENV ==="development"? false:true
    }).json({
        succes:true,
        message:"Logout Successfull"
    });
});

const getUser = (req,res,next)=>{
    res.json({
        succes:true,
        message:{
            id: req.user.id,
            name: req.user.name
        }
    })
}

const imageUpload = asyncErrorWrapper(async(req,res,next)=>{
    //ımage upload success

    res.status(200)
    .json({
        succes:true,
        message:"Image upload succesfull"
    });
});

module.exports = {
    register,
    getUser,
    login,
    logout,
    imageUpload
}