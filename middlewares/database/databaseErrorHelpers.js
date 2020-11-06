const User = require("../../models/User");
const Question = require("../../models/Question");
const CustomError = require("../..//helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const checkUserExist = asyncErrorWrapper(async(req,res,next) => {
    const {id} = req.params;

    const user = await User.findById(id);

    if (!user) {
        return next(new CustomError(`User Not Found with Id : ${answer_id}`,404));
    }
    next();

});

const checkQuestionExist = asyncErrorWrapper(async(req,res,next) => {
    const {id} = req.params;

    const question = await Question.findById(id);

    if (!question) {
        return next(new CustomError("Question Not Found with Id :",404));
    }
    next();

});

module.exports = {
    checkUserExist,
    checkQuestionExist
}