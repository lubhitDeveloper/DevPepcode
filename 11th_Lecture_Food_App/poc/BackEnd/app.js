const express= require("express");
const fs= require("fs");
const plans= require("./db/plans.json");
const users= require("./db/users.json");
const { v4: uuidv4 }= require("uuid");
const mongoose= require("mongoose");

const app= express();

app.use(express.json());
//connect
mongoose.connect("mongodb+srv://lubhit123:lubhit123@cluster0.ugny9.mongodb.net/test?retryWrites=true&w=majority",
 {useNewUrlParser: true, useUnifiedTopology: true}
 ).then((db)=> {
     console.log(db);
 });
//Define Schema
 let planSchema= new mongoose.Schema({
     name: String,
     price: Number
 })
//Schema will compile into a collection
 const planModel= mongoose.model("plancollection", planSchema);
//Add a document
 planModel.create({
     name: "Vegan",
     price: 100
 }).then((plan)=>{
     console.log(plan);
 }).catch((error)=>{
     console.log(error);
 })
//user => get all users,get user by id, updae a user, delete a user, create a user
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
    fs.writeFileSync("./db/users.json", JSON.stringify(users));
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
        fs.writeFileSync("./db/users.json", JSON.stringify(users));
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
        fs.writeFileSync("./db/users.json", JSON.stringify(filteredUsers));

        res.status(200).json({
            message:"User Deleted Succesfully !",
    })
    }
}

app.get("/api/users", getAllUsers);

app.post("/api/users", createUser); 

app.get("/api/users/:id", getUserById);

app.patch("/api/users/:id", updateUserbyId);

app.delete("/api/users/:id", deleteUserById);

// ********************************************************************************************

function getAllPlans(req, res){
    if(plans.length){
        res.status(200).json({
            message:"Succesfully got all plans",
            data: plans
        })
    }
    else{
        res.status(200).json({
            message:"NO PLANS FOUND"
        })
    }
    
}

function createPlan(req, res){
    let plan= req.body;
    plan.id= uuidv4();
    plans.push(plan);
    fs.writeFileSync("./db/plans.json", JSON.stringify(plans));

    res.status(201).json({
        message:"Succesfully created a plan !",
        data: plans
    })
}

function getPlanById(req, res){
    let {id}= req.params;
    let filterePlans= plans.filter(function(plan){
        return plan.id == id;
    })

    if(filterePlans.length){
        res.status(200).json({
            message: "Successfully get plan id",
            data: filterePlans[0]
        })
    }
    else{
        res.status(404).json({
            message: "PLAN NOT FOUND !!"
        })
    }
}

function updatePlanById(req,res){
    let {id}= req.params;
    let updateObj= req.body;

    let filteredPlan= plans.filter(function(plan){
        return plan.id == id
    })
    if(filteredPlan.length){
        let plan= filteredPlan[0];
        for(key in updateObj){
            plan[key]= updateObj[key];
        }
        fs.writeFileSync("./db/plans.json", JSON.stringify(plans));
        res.status(200).json({
            message: "Plan Updated !"
        })
    }
    else{
        res.status(404).json({
            message: "Plan Not Found !"
        })
    }
}

function deletePlanById(req, res){
    let {id}= req.params;

    let filteredPlans= plans.filter(function(plan){
        return plan.id != id;
    })
    if(filteredPlans.length == plans.length){
        res.status(404).json({
            message: "Plan Not Found !"
        })
    }
    else{
        fs.writeFileSync("./db/plans.json", JSON.stringify(filteredPlans));

        res.status(200).json({
            message:"Plan Deleted Succesfully !",
    })
    }
}
//get all plans
app.get("/api/plans", getAllPlans);
//create a plan
app.post("/api/plans", createPlan);

//get plan by id
app.get("/api/plans/:id", getPlanById);

//update a plan
app.patch("/api/plans/:id", updatePlanById);

//delete a plan
app.delete("/api/plans/:id", deletePlanById);


app.listen(3000, function(){
    console.log("Server Started at port 3000");
})