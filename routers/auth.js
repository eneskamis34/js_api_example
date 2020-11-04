const express = require("express");
const {register,login,resetPassword,forgotPassword,logout,getUser,imageUpload} = require("../controllers/auth");
const profileImageUpload = require("../middlewares/liblaries/profileImageUpload");
//api/auth
 //api/auth/register
const {getAccessToRoute} = require("../middlewares/authorization/auth");

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/profile",getAccessToRoute,getUser);
router.get("/logout",getAccessToRoute,logout);
router.post("/upload",[getAccessToRoute,profileImageUpload.single("profile_image")],imageUpload);
router.post("/forgotpassword",forgotPassword);
router.put("/resetpassword",resetPassword);
module.exports = router;

//bir nevi middleware sayfası