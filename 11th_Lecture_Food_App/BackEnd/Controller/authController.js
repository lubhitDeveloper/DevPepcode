const userModel = require("../Model/usersModel");
const jwt= require("jsonwebtoken");
const { SECRET_KEY } = require("../config/secrets");


async function signup(req, res){
    try{
        let user= req.body;
        let newUser= await userModel.create({
          name: user.name,
          email: user.email,
          password:user.password,
          confirmPassword:user.confirmPassword,
          role:user.role
        });
        //console.log(newUser);
        res.status(201).json({
            message:"Succesfully Signed up !!",
            data: newUser
        })
    }
    catch(error){
        res.status(501).json({
            message:"Sign Up Failed !!",
            error: error.errors.password.message
        })
    }
}

async function login(req, res){
    try{
        let{email, password}= req.body;
        let loggedInUser= await userModel.find({email:email});
        if(loggedInUser.length){
            let user= loggedInUser[0];
            if(user.password == password){
                //token ban na chahie yhn pr
                const token= jwt.sign({id: user["_id"]}, SECRET_KEY);
                res.status(201).json({
                    message:"Succesfully Logged In !!",
                    data: loggedInUser[0],
                    token
                })
            }
            else{
                res.status(501).json({
                    message:"Email and Password didn't matched !!",
                })
            }
        }
        else{
            res.status(501).json({
                message:"No User found signup first !!",
            })
        }
    }
    catch(error){
        res.status(501).json({
            message:"Login Failed !!",
            error
        })
    }
}

async function protectRoute(req, res, next){
    try{
        const token= req.headers.authorization.split(" ").pop();
        console.log(token);
        const payload= jwt.verify(token, SECRET_KEY);
        console.log(payload);
        if(payload){
            req.id= payload.id;
            next();
        }
        else{
            res.status(501).json({
                message: "Please Login !!"
            })
        }
    }
    catch(error){
        res.status(501).json({
            message: "Please Login !!",
            error
        })
    }
}

async function isAuthorized(req, res, next){
    try{
        let id= req.id;
        let user= await userModel.findById(id);
        if(user.role == "admin"){
            next();
        }
        else{
            res.status(200).json({
                message:"You don't have admin rights !!"
            })
        }
    }
    catch(error){
        res.status(501).json({
            message:"FAILED TO AUTHORIZE !",
            error
        })
    }
}

async function forgetPassword(req, res){
    try{
        let {email}= req.body;

        let user= await userModel.findOne({email:email});
        console.log(user);
        if(user){
            let token= user.createPwToken();
            await user.save({validateBeforeSave: false});
            let resetLink=`http://localhost:3000/api/user/resetpassword/${token}`
            res.json({
                message: "Rest link is sent to email",
                resetLink
            })
        }
        else{
            res.status(404).json({
                message: "USE NOT FOUND ! PLEASE SIGNUP FIRST !"
            })
        }
    }
    catch(error){
        res.status(501).json({
            message: "FAILED TO FORGET PASSWORD !"
        })
    }
}

async function resetPassword(req, res){
    try{
        const token= req.params.token;
        const {password, confirmPassword}= req.body;
        const user= await userModel.findOne({
            pwToken: token,
            tokenTime: { $gt : Date.now() }
        })
        console.log(user);
        if(user){
            user.resetPasswordHandler(password, confirmPassword);
            await user.save();
            res.status(200).json({
                message: "Password reset Successfull !!",
                user
            })
        }
        else{
            res.status(404).json({
                message: "Password reset link expired !!"
            })
        }

    }
    catch(error){
        res.status(501).json({
            message: "Password reset Failed !!",
            error
        })
    }
}

module.exports.signup= signup;
module.exports.login= login;
module.exports.protectRoute= protectRoute;
module.exports.isAuthorized= isAuthorized;
module.exports.forgetPassword= forgetPassword;
module.exports.resetPassword= resetPassword;