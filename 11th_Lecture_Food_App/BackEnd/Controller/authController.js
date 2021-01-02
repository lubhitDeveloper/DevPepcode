const userModel = require("../Model/usersModel");
const jwt= require("jsonwebtoken");
const { SECRET_KEY, GMAIL_ID, GMAIL_PASS } = require("../config/secrets");
const nodemailer= require("nodemailer");


async function sendEmail(message){
    try{
        const transporter= nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            secure: true,
            auth: {
                user: GMAIL_ID,
                pass: GMAIL_PASS
             }
        })

        let res= await transporter.sendMail({
            from: message.from,
            to: message.to,
            subject: message.subject,
            text: message.text
            //html: "<b>Hello Sir</b>"
        });
        return res;
    }
    catch(error){
        return error;
    }
}

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
        res.status(200).json({
            message:"Succesfully Signed up !!",
            data: newUser
        })
    }
    catch(error){
        res.status(200).json({
            message:"Sign Up Failed !!",
            error: error.errors.confirmPassword.message
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
                res.cookie("jwt", token, {httpOnly: true});
                res.status(200).json({
                    message:"Succesfully Logged In !!",
                    data: loggedInUser[0],
                })
            }
            else{
                res.status(200).json({
                    message:"Email and Password didn't matched !!",
                })
            }
        }
        else{
            res.status(200).json({
                message:"No user found signup first !!",
            })
        }
    }
    catch(error){
        res.status(200).json({
            message:"Login Failed !!",
            error
        })
    }
}

async function logout(req, res){
    try{
        res.clearCookie("jwt");
        res.redirect("/");
    }
    catch(error){
        res.status(501).json({
            error
        })
    }
}

async function isLoggedIn(req, res, next){
    try{
        let token= req.cookies.jwt;
        const payload= jwt.verify(token , SECRET_KEY);
        if(payload){
            let user= await userModel.findById(payload.id);
            req.name= user.name;
            next();
        }
        else{
            next();
        }
    }
    catch(error){
        next();
    }
}

async function protectRoute(req, res, next){
    try{
        const token= req.cookies.jwt;
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

async function forgotPassword(req, res){
    try{
        let {email}= req.body;

        let user= await userModel.findOne({email:email});
        console.log(user);
        if(user){
            let token= user.createPwToken();
            await user.save({validateBeforeSave: false});
            let resetLink=`http://localhost:3000/resetpassword/${token}`
            let message= {
                from: "lubhitmalhotra12@gmail.com",
                to: email,
                subject: "RESET PASSWORD",
                text: resetLink
            }

            let response= await sendEmail(message);

            res.json({
                message: "Reset link is sent to email",
                response
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
module.exports.logout= logout;
module.exports.protectRoute= protectRoute;
module.exports.isAuthorized= isAuthorized;
module.exports.forgotPassword= forgotPassword;
module.exports.resetPassword= resetPassword;
module.exports.isLoggedIn= isLoggedIn;