// const plans= require("../Model/plansModel.json");
// const {v4 : uuidv4}= require("uuid");
// const fs= require("fs");
// const path= require("path");
const planModel= require("../Model/plansModel");


async function getAllPlans(req, res){
    try{
        let plans= await planModel.find({});
        res.status(200).json({
            message:"Got all plans successfully !!",
            data : plans
          })
    }
    catch(error){
        res.status(501).json({
            message:"No Plans Found !!",
            error
          })
    }
}

async function createPlan(req, res){
    try{
        let sentPlan = req.body;
        let plan = await planModel.create(sentPlan);
        res.status(200).json({
        message:"Plan Created Succesfully",
        data :plan
    })
    }
    catch(error){
        res.status(501).json({
            message:"Failed to create a plan",
            error: error.errors.discount.message
        })
    }
}

async function getPlanById(req, res){
    try{
        let {id}= req.params;
        let plan= await planModel.findById(id);
        res.status(200).json({
            message:"Succesfully got plan by id !!",
            data : plan
          })
    }
    catch(error){
        res.status(501).json({
            message:"Plan Not Found !!",
            error
          })
    }
}

async function updatePlanById(req,res){
    try{
        let {id}= req.params;
        let updateObj= req.body;
        let updatedPlan= await planModel.findByIdAndUpdate(id, updateObj, {new: true});
        res.status(200).json({
            message:"Updated Plan successfully !!",
            data : updatedPlan
          })
    }
    catch(error){
        res.status(501).json({
            message:"Failed to update a plan !!",
            error
          })
    }
}

async function deletePlanById(req, res){
    try{
        let {id}= req.params;
        let deletedPlan= await planModel.findByIdAndDelete(id);
        res.status(200).json({
            message:"Deleted a plan successfully !!",
            data : deletedPlan
          })
    }
    catch(error){
        res.status(501).json({
            message:"Failed to delete a plan !!",
            error
          })
    }
}

module.exports.getAllPlans= getAllPlans;
module.exports.createPlan= createPlan;
module.exports.getPlanById= getPlanById;
module.exports.updatePlanById= updatePlanById;
module.exports.deletePlanById= deletePlanById;