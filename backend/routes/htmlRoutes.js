const express = require("express");
const router = express.Router();
const controller = require("../controllers")
const getControllers = controller.get
const postControllers = controller.post


//Get Controller
router.route("/").get(getControllers.login);
router.route("/signup").get(getControllers.signup);
router.route("/phonenumber").get(getControllers.phonenumber);
router.route("/email").get(getControllers.email);
router.route("/logout").get(getControllers.logout);
router.route("/index").get(getControllers.index);

//POST Controller
router.route("/indexPage").post(postControllers.indexPage);
router.route("/signUpUser").post(postControllers.signUpUser);
router.route("/otp").post(postControllers.otp);
router.route("/check").post(postControllers.check);

router.route("/OTPemail").post(postControllers.OTPemail);
router.route("/emailVerify").post(postControllers.emailVerify);
router.route("/Userdetails").post(postControllers.Userdetails);


module.exports = router;