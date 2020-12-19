const plans= require("../Model/plansModel.json");
const {v4 : uuidv4}= require("uuid");
const fs= require("fs");
const path= require("path");

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

    let plansPath = path.join(__dirname, '..', 'Model', 'plansModel.json');
  
    fs.writeFileSync(plansPath , JSON.stringify(plans));

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
        return plan.id == id;
    })
    if(filteredPlan.length){
        let plan= filteredPlan[0];
        for(key in updateObj){
            plan[key]= updateObj[key];
        }
        let plansPath = path.join(__dirname, '..', 'Model', 'plansModel.json');
        fs.writeFileSync(plansPath , JSON.stringify(plans));

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

        let plansPath = path.join(__dirname, '..', 'Model', 'plansModel.json');
        fs.writeFileSync(plansPath , JSON.stringify(filteredPlans));

        res.status(200).json({
            message:"Plan Deleted Succesfully !",
    })
    }
}

module.exports.getAllPlans= getAllPlans;
module.exports.createPlan= createPlan;
module.exports.getPlanById= getPlanById;
module.exports.updatePlanById= updatePlanById;
module.exports.deletePlanById= deletePlanById;