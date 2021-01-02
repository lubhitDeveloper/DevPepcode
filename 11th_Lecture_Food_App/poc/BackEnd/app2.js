const express= require("express");
const app = express();
const nodemailer= require("nodemailer");


async function sendEmail(){
    try{
        const transporter= nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            secure: true,
            auth: {
                user: "lubhitmalhotra12@gmail.com",
                pass: "ceefgckbargggjik"
             }
        })

        await transporter.sendMail({
            from: "lubhitmalhotra12@gmail.com",
            to: "lubhitmalhotra1122@gmail.com",
            subject: "Hy",
            text: "Heloo I am noob user of nodemailer",
            html: "<b>Hello Sir</b>"
        })
    }
    catch(error){
        return error;
    }
}

sendEmail().then(function(){
    console.log("Email Sent!!");
}).catch(function(error){
    console.log("Not Sent Email");
})


app.listen(5500 , function(){
    console.log("Server started at 5500 !!");
})