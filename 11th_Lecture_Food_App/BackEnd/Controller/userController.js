// const users= require("../Model/usersModel.json");
// const {v4 : uuidv4}= require("uuid");
// const fs= require("fs");
// const path= require("path");
const userModel= require("../Model/usersModel");

async function getAllUsers(req,res){
    try{
        let users= await userModel.find({});
        res.status(200).json({
            message:"Got all users successfully !!",
            data : users
          })
    }
    catch(error){
        res.status(501).json({
            message:"No Users Found !!",
            error
          })
    }
}

async function createUser(req,res){
   try{
        let sentUser= req.body;
        let user= await userModel.create(sentUser);
        res.status(200).json({
            message:"Created a user successfully !!",
            data : user
          })
   }
   catch(error){
    res.status(200).json({
        message:"No User Created !!",
        error: error.errors.email.message
      })
   }
}

async function getUserById(req, res){
    try{
        let {id}= req.params;
        let user= await userModel.findById(id);
        res.status(200).json({
            message:"Succesfully got user by id !!",
            data : user
          })
    }
    catch(error){
        res.status(501).json({
            message:"No User Found by id !!",
            error
          })
    }
}

async function updateUserbyId(req, res){
    try{
        let {id}= req.params;
        let updateUserObj= req.body;
        let updatedUser= await userModel.findByIdAndUpdate(id, updateUserObj, {new : true});
        res.status(200).json({
            message:"Succesfully updated a user !!",
            data : updatedUser
          })
    }
    catch(error){
        res.status(501).json({
            message:"No User updated !!",
            error
          })
    }
}

async function deleteUserById(req, res){
    try{
        let {id}= req.params;
        let deletedUser= await userModel.findByIdAndDelete(id);
        res.status(200).json({
            message:"Succesfully deleted a user !!",
            data : deletedUser
          })
    }
    catch(error){
        res.status(501).json({
            message:"No User Deleted !!",
            error
          })
    }
}

module.exports.getAllUsers= getAllUsers;
module.exports.createUser= createUser;
module.exports.getUserById= getUserById;
module.exports.updateUserbyId= updateUserbyId;
module.exports.deleteUserById= deleteUserById;