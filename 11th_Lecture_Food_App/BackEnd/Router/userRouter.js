const express= require("express");
const { getAllUsers, createUser, getUserById, updateUserbyId, deleteUserById } = require("../Controller/userController");
const userRouter= express.Router();

userRouter.route("").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUserById).patch(updateUserbyId).delete(deleteUserById);


module.exports= userRouter;