const CustomError = require("../../helpers/error/CustomError");
const jwt = require('jsonwebtoken');
const{isTokenIncluded,getAccessTokenFromHeader} = require("../../helpers/authorization/tokenHelpers");
const getAccessToRoute = (req,res,next)=>{
    // Token Kontrolü
    const{JWT_SECRET_KEY} = process.env;
    if(!isTokenIncluded(req)){
        //401 Unauthorized
        //403 Forbidden
        return next(new CustomError("you are not authorized to access this routex",401))
    }
    const accessToken = getAccessTokenFromHeader(req);
    jwt.verify(accessToken,JWT_SECRET_KEY,(err,decoded)=>{
        if(err)
        {
            return next(new CustomError(err,401)); //hata buraya düşüyor.
        }
        console.log(decoded);
        next();
    });
};

module.exports = {
    getAccessToRoute
};

