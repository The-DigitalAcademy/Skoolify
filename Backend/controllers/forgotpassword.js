const client = require("../config/db_config");

exports.forgotpassword= async (req, res) => {


    const {email,message} = req.body; 

   


    if(email && message){


       // const data = await client.query("SELECT * FROM Users WHERE email= $1", 


  
  
      //write a code to send email with that pas string
      var nodemailer = require('nodemailer')
      var transporter = nodemailer.createTransport({
      
          service:'gmail',
          auth:{
            //change the sender by creating a skoolify account on gmail or outlook
              user:'godfrey555mabena@gmail.com',
              pass:'mpwfcscmyfokqchd'
              
          }
  
  
      });
  
      var mailOptions ={
  
          from:'godfrey555mabena@gmail.com',
          to:JSON.stringify(email),
          subject:'We got you Client Query',
          text: (message)
  
      };
  
  
      transporter.sendMail(mailOptions,function(error,info){
  
          if(error){
              console.log(error)
          }else{
              console.log('Email sent ' + info.response)
              res.status(200).json({message: "Email successfully sent to " + email});
          }
  
  
      })
  
  
    }

}