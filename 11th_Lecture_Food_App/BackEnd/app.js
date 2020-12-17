const express= require("express");
const fs= require("fs");
const plans= require("./db/plans.json");
const users= require("./db/plans.json");
const { v4: uuidv4 }= require("uuid");

const app= express();

app.use(express.json());
//app.httpmethod(appRoute, cb function(request, response))

//get all plans
app.get("/api/plans", function(req, res){
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
    
})
//create a plan
app.post("/api/plans", function(req, res){
    let plan= req.body;
    plan.id= uuidv4();
    plans.push(plan);
    fs.writeFileSync("./db/plans.json", JSON.stringify(plans));

    res.status(201).json({
        message:"Succesfully created a plan !",
        data: plans
    })
})

//get plan by id
app.get("/api/plans/:id", function(req, res){
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
})

//update a plan
app.patch("/api/plans/:id", function(req,res){
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
})

//delete a plan
app.delete("/api/plans/:id", function(req, res){
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
})


app.listen(3000, function(){
    console.log("Server Started at port 3000");
})