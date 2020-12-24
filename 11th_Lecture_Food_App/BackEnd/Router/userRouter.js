const express= require("express");
const { signup, login, protectRoute, forgetPassword, resetPassword } = require("../Controller/authController");
const { getAllUsers, createUser, getUserById, updateUserbyId, deleteUserById } = require("../Controller/userController");
const userRouter= express.Router();


//userRouter.route("").get(getAllUsers).post(createUser);
userRouter.route("").get(protectRoute ,getUserById).patch( protectRoute, updateUserbyId).delete(protectRoute, deleteUserById);

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/forgetpassword", forgetPassword);
userRouter.patch("/resetpassword/:token", resetPassword);

module.exports= userRouter;