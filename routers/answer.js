const express = require("express");

const router = express.Router({mergeParams:true});
const {getAccessToRoute} = require("../middlewares/authorization/auth");
const {checkQuestionAndAnswerExist} = require("../middlewares/database/databaseErrorHelpers");
const {addNewAnswerToQuestion,getAllAnswersByQuestion,getSingleAnswer,editAnswers,deleteAnswer,likeAnswer,undolikeAnswer} = require("../controllers/answer");
const {getAnswerOwnerAccess} = require("../middlewares/authorization/auth");

router.post("/",getAccessToRoute,addNewAnswerToQuestion);

router.get("/",getAllAnswersByQuestion);

router.get("/:answer_id",checkQuestionAndAnswerExist,getSingleAnswer);

router.get("/:answer_id/like",[checkQuestionAndAnswerExist,getAccessToRoute],likeAnswer);
router.get("/:answer_id/undo_like",[checkQuestionAndAnswerExist,getAccessToRoute],undolikeAnswer);


router.put("/:answer_id/edit",[checkQuestionAndAnswerExist,getAccessToRoute,getAnswerOwnerAccess],editAnswers);

router.delete("/:answer_id/delete",[checkQuestionAndAnswerExist,getAccessToRoute,getAnswerOwnerAccess],deleteAnswer);

module.exports = router; 