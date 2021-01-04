const express= require("express");
const planRouter = require("./Router/planRouter");
const userRouter = require("./Router/userRouter");
const viewRouter = require("./Router/viewRouter");
const path= require("path");
const app= express();
const cookieParser= require("cookie-parser");
const bookingRouter = require("./Router/bookingRouter");

app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
//app.httpmethod(appRoute, cb function(request, response))
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "View"));

app.use("/api/booking", bookingRouter);
app.use("/api/plans", planRouter);
app.use("/api/user", userRouter);
app.use("", viewRouter);


app.listen(3000, function(){
    console.log("Server Started at port 3000");
})
