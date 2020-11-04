const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClinet} = require("../helpers/authorization/tokenHelpers");
const {validateUserInput,comparePassword} = require("../helpers/input/inputHelpers");
const sendEmail = require("../helpers/libraries/sendEmail");

const register = asyncErrorWrapper( async (req, res, next) => {
    
    const {name,email,password,role} = req.body;    

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        sendJwtToClinet(user,res);

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
    const user = await User.findByIdAndUpdate(req.user.id,{
        "profile_image":req.savedProfileImage
    },{
        new: true,
        runValidators:true
    });
    res.status(200)
    .json({
        succes:true,
        message:"Image upload succesfull",
        data: user
    });
});

//forgot password
const forgotPassword = asyncErrorWrapper(async(req,res,next)=>{
    const resetEmail = req.body.email;

    const user = await User.findOne({email:resetEmail});
    if(!user)
    {
        return next(new CustomError("There isnt user with that email",400));
    }
    const resetPasswordToken = user.getResetPasswordTokenFromUser();

    await user.save();

    const resetPasswordUrl = `http://localhost:5000/api/v1/auth/resetPassword?resetPasswordToken=${resetPasswordToken}`;
    const emailTemplate = `
    <h3>Reset Your Password</h3>
    <p>This <a href = '${resetPasswordUrl}' target = '_blank'>link</a>  will expire in 1 hour</p>
    
    `;

    try{
        await sendEmail({
            from:process.env.SMPT_EMAIL,
            to: resetEmail,
            subject:"Reset Your Password",
            html: emailTemplate
        });
        return res.status(200).json({
            succes:true,
            message:"Tokent Sent Your Email",
            data:user
        });
    }
    catch(err)
    {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        return next(new CustomError("Email could not be sent"),500);
    }

});

module.exports = {
    register,
    getUser,
    login,
    logout,
    imageUpload,
    forgotPassword
}