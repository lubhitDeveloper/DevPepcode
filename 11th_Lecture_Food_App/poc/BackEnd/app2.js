const express= require("express");
const app = express();
const nodemailer= require("nodemailer");


async function sendEmail(){
    try{
        const transporter= nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "63c136da27ea8f",
                pass: "385bb745824f90"
             }
        })

        await transporter.sendMail({
            from: "lubhitmalhotra@gmail.com",
            to: "avv@aa.com",
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