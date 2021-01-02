let planModel= require("../Model/plansModel");

async function getHomePage(req , res){
    try{
        let plans= await planModel.find();
        plans= plans.splice(0, 3);
        res.render("homepage.pug", {name: req.name, plans});
    }
    catch(error){
        console.log(error);
    }
}

function getLoginPage(req, res){
    res.render("login.pug", {name: req.name});
}

function getSignUpPage(req, res){
    // res.render("signup.pug");
    res.render("signup.pug", {name: req.name});
}

function getProfilePage(req, res){
    try{
        res.render("profile.pug", {name: req.name});
    }
    catch(error){
        console.log(error);
    }
}

async function getPlansPage(req, res){
    try{   
        let plans= await planModel.find();
        console.log(plans);
        res.render("plans.pug", {name: req.name, plans: plans});
    }
    catch(error){
        console.log(error);
    }
}

async function getForgotPass(req, res){
    try{
        res.render("forgotPass.pug");
    }
    catch(error){
        console.log(error);
    }
}

async function getResetPass(req, res){
    try{
        res.render("resetPass.pug");
    }
    catch(error){
        console.log(error);
    }
}


module.exports.getHomePage= getHomePage;
module.exports.getLoginPage= getLoginPage;
module.exports.getSignUpPage= getSignUpPage;
module.exports.getProfilePage= getProfilePage;
module.exports.getPlansPage= getPlansPage;
module.exports.getForgotPass= getForgotPass;
module.exports.getResetPass= getResetPass;