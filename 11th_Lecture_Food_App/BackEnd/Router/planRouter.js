const express= require("express");
const { getAllPlans, createPlan, getPlanById, updatePlanById, deletePlanById } = require("../Controller/planController");
const planRouter= express.Router();

planRouter.route("").get(getAllPlans).post(createPlan);
planRouter.route("/:id").get(getPlanById).patch(updatePlanById).delete(deletePlanById);


module.exports= planRouter;