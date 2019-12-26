var express=require('express');
var bodyParser=require('body-parser');
//const mailConfig=require('./config/mailConfig')
const app=express();
const port = 4000;
//Middleware
app.use(bodyParser.json());

var nodemailer = require("nodemailer");

var mailConfig = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "<your email>",
        pass: "<password>"
    }
});


//Routers
app.post('/send',function(req,res){



    var mailOptions={
        to : req.body.to,
        subject : req.body.subject,
        text : req.body.text
    }
    console.log(mailOptions);
    mailConfig.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
            res.send("error");
     }else{
            console.log("Message sent");
            res.send("sent");
         }
});
});

app.listen(port,function(){
console.log("Server Started on Port "+port );
});