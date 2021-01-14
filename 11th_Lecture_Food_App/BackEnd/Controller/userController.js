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
        let id= req.id;
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
        let id= req.id;
        let updateUserObj= req.body;
        let user= await userModel.findById(id);

        for(key in updateUserObj){
            user[key]= updateUserObj[key];
        }
        let updatedUser= await user.save();

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
        let id= req.id;
        let deletedUser= await userModel.findByIdAndDelete(id);
        if(deletedUser){
        res.status(200).json({
            message:"Succesfully deleted a user !!",
            data : deletedUser
          })
        }
        else{
            res.status(501).json({
                message:"User Not Found !"
            })
        }
    }
    catch(error){
        res.status(501).json({
            message:"No User Deleted !!",
            error
          })
    }
}

async function updateProfilePhoto(req, res){
    try{
        let file= req.file;
        console.log(file);

        let id= req.id;

        let user= await userModel.findById(id);
        
        let imgPath= file.destination+"/"+file.filename;
        imgPath= imgPath.substring(6); 
        
        user.pImage= imgPath;
        await user.save({validateBeforeSave: false});
        
        res.status(200).json({
            message: "Profile photo updated !!"
        })
    }
    catch(error){
        res.status(200).json({
            message: "Failed to update photo !!",
            error
        })
    }
}

module.exports.getAllUsers= getAllUsers;
module.exports.createUser= createUser;
module.exports.getUserById= getUserById;
module.exports.updateUserbyId= updateUserbyId;
module.exports.deleteUserById= deleteUserById;
module.exports.updateProfilePhoto= updateProfilePhoto;