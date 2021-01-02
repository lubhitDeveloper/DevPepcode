const express= require("express");
const { isLoggedIn, logout } = require("../Controller/authController");
const { getHomePage, getLoginPage, getSignUpPage, getPlansPage, getForgotPass, getResetPass, getProfilePage } = require("../Controller/viewController");

const viewRouter= express.Router();

viewRouter.use(isLoggedIn);

viewRouter.route("").get(getHomePage);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("/logout").get(logout);
viewRouter.route("/signup").get(getSignUpPage);
viewRouter.route("/profile").get(getProfilePage);
viewRouter.route("/plans").get(getPlansPage);
viewRouter.route("/forgotpass").get(getForgotPass);
viewRouter.route("/resetpassword/:token").get(getResetPass);

module.exports= viewRouter;