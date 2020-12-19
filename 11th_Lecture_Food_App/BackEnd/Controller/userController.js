const users= require("../Model/usersModel.json");
const {v4 : uuidv4}= require("uuid");
const fs= require("fs");
const path= require("path");

function getAllUsers(req,res){
    if(users.length){
        res.status(200).json({
            message:"Succesfully got all users",
            data: users
        }) 
    }
    else{
        res.status(200).json({
            message:"NO USERS FOUND !!"
        })
    }

}

function createUser(req,res){
    let user= req.body;
    user.id= uuidv4();
    users.push(user);
    let usersPath = path.join(__dirname, '..', 'Model', 'usersModel.json');
    fs.writeFileSync(usersPath , JSON.stringify(users));
    res.status(201).json({
        message:"Succesfully created a user !",
        data: users
    })
}

function getUserById(req, res){
    let {id}= req.params;
    let filteredUsers= users.filter(function(user){
        return user.id == id;
    })
    if(filteredUsers.length){
        res.status(200).json({
            message: "Successfully got user id",
            data: filteredUsers[0]
        })
    }
    else{
        res.status(404).json({
            message: "USER NOT FOUND !!"
        })
    }
}

function updateUserbyId(req, res){
    let {id}= req.params;
    let updateUserObj= req.body;

    let filteredUser = users.filter(function(user){
        return user.id == id;
    })
    if(filteredUser.length){
        let user= filteredUser[0];
        for(key in updateUserObj){
            user[key] = updateUserObj[key];
        }
        let usersPath = path.join(__dirname, '..', 'Model', 'usersModel.json');
        fs.writeFileSync(usersPath , JSON.stringify(users));
        res.status(200).json({
            message: "User Updated !",
            data: users
        })
    }
    else{
        res.status(404).json({
            message: "User Not Found !"
        })
    }
}

function deleteUserById(req, res){
    let {id}= req.params;

    let filteredUsers= users.filter(function(user){
        return user.id != id;
    })
    if(filteredUsers.length == users.length){
        res.status(404).json({
            message: "User Not Found !"
        })
    }
    else{
        let usersPath = path.join(__dirname, '..', 'Model', 'usersModel.json');
        fs.writeFileSync(usersPath , JSON.stringify(filteredUsers));

        res.status(200).json({
            message:"User Deleted Succesfully !",
    })
    }
}

module.exports.getAllUsers= getAllUsers;
module.exports.createUser= createUser;
module.exports.getUserById= getUserById;
module.exports.updateUserbyId= updateUserbyId;
module.exports.deleteUserById= deleteUserById;