const express= require("express");
const planRouter = require("./Router/planRouter");
const userRouter = require("./Router/userRouter");

const app= express();

app.use(express.json());
//app.httpmethod(appRoute, cb function(request, response))
app.use("/api/plans", planRouter);
app.use("/api/users", userRouter);


app.listen(3000, function(){
    console.log("Server Started at port 3000");
})
