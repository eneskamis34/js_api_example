const express = require("express");
const {askNewQuestion,deleteQuestion,editQuestion,getAllQuestions,getSingleQuestion} = require("../controllers/question");
const {checkQuestionExist, checkUserExist} = require("../middlewares/database/databaseErrorHelpers");
const {getAccessToRoute, getQuestionOwnerAccess} = require("../middlewares/authorization/auth");
 //api/questions
const router = express.Router();


router.get("/",getAllQuestions);
router.get("/:id",checkUserExist,getSingleQuestion);
router.post("/ask",getAccessToRoute,askNewQuestion);
router.put("/:id/edit",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],editQuestion);
router.delete("/:id/delete",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],deleteQuestion);
module.exports = router;
//bir nevi middleware sayfası