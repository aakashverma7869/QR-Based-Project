
let _id = null

const User = require("../models/user")

var nodemailer = require("nodemailer");

const Nexmo = require('nexmo');
//for OTP generator
const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
});

//for email

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user: "aakashverma7869@gmail.com",
      pass: "****************"
  }
});
var rand,mailOptions,host,link;
// send email 


let OTPemail = (req, res) => {
rand=Math.floor((Math.random() * 100) + 54);
host=req.get('host');
link=rand;
mailOptions={
  to : req.body.email,
  subject : "Please confirm your Email account",
  html : "Hello,<br> Here is Your Otp.<br>"+link+"."
}
console.log(mailOptions);
smtpTransport.sendMail(mailOptions, function(error, response){
if(error){
      console.log(error);
  res.end("error");
}else{
      console.log("Message sent: " + response.message);
      if(!req.session.useremail)
      {
        console.log("IF-->");
        //if session is not present make a session for the user
        req.session.useremail = req.body.email;

      }
      res.render("OTPemail");
   }
});
};

//verify email
let emailVerify = (req, res) => {
  console.log("herer is the session for email id is ------>>>",req.session.useremail);
 // console.log(typeof req.session.useremail)
 // const user = new User({email:req.session.useremail});
 // console.log("herer is the emia after------>>>",req.session.useremail)
 // console.log(typeof req.session.useremail)

    //  console.log("Domain is matched. Information is from Authentic email");
      if(link==req.body.codee)
      {
          console.log("email is verified");

     
         
          res.render("PhoneNumber");
      }
      else
      {
          console.log("email is not verified");
      }
  };
  


// for mobile OTP


//check or emailid and password if correct render to index page





let indexPage = (req, res) => {
  console.log("Post request for login");
    const {email,password} = req.body;

    User.findOne({ email }, (err, user) => {
      console.log("Entry of DB...........")
        if (err || !user) {
          console.log("invalid login password")
          req.session.loginstatus = "Invalid"
          res.redirect("/");
        }
        
        else if(user.password==password){
          //check of already session
          if(!req.session.userid)
          {
            console.log("IF-->");
            //if session is not present make a session for the user
            req.session.userid = user._id;

            const obje = { 
              "status":"Successfully",
              "userName":user.name,
              "userPhone":user.phone
              
             }
             console.log("OBhect milna vala h",obje);
             console.log("OBhect milna vala h",user);
            res.render("index",{user:user,"status":"Successfully"});
          }
        }
        else{
          console.log("Else part--->>>>>>>")
          res.redirect("/");
        }
    });
}


//for SignUp user
let  signUpUser = (req, res) => {
  if(req.body.password1 == req.body.password2)
  {
    const user = new User({"name":req.body.name,"password":req.body.password1,"email":req.session.useremail ,"phone":req.session.userOtp });
    console.log("req.body is -->",req.body);

    user.save((err, category) => {
     // console.log("category is ->>", category);
      if (err) {
        return res.status(400).json({
          error: "NOT able to save category in DB"
        });
      }
      else{
            console.log("Sucessful store in DB",category);
            req.session.useridd = category._id;
            res.render("addBussiness");

         //   res.render("index",{"userName": category.name,"userPhone":category.phone,"status":"Successfully"});
      }
    });
  }

  else{
    console.log("password does not matched");
  }
  };

let Userdetails = (req,res) =>{

  User.findOneAndUpdate(
    { _id: req.session.useridd},
    { $set: req.body },
    { new: true ,useFindAndModify : false},
  // { name:(name || "").toString() ,
  //   email:(email || "").toString(),
  //   state:(state || "").toString(),
  //   city:(city || "").toString(),
  //   country:(country || "").toString(),
  //   date:(date || "").toString(),
  //   gender:(gender || "").toString(),
  //   phone:(phone || "").toString()
  // },
  (err, user) => {
    if (err) {
      console.log("error in updte",err.errmsg);
    }
    else{
      console.log("data updated",user);

      res.render("index",{user:user,"status":"Successfully"});


      // res.render("index",{"userName": output.name,"userPhone": output.phone, "status":output.status});
    }
  }

);

}








//After entering the phone number
  let otp = (req, res) => {
      // A user registers with a mobile phone number
      let phoneNumber = req.body.phone;
      console.log(phoneNumber);
      //check the user is registered in DB
   
 
          //making of session
        req.session.userOtp = req.body.phone;
        console.log("OTP------------>",req.session.userOtp);

        nexmo.verify.request({number: "91"+phoneNumber, brand: 'travastra',workflow_id: '6'}, (err, result) => {
        if(err) {
          console.log(err);
     
          //Oops! Something went wrong, respond with 500: Server Error
          res.status(500).send(err);
        } else {
          console.log(result);
     
          if(result && result.status == '0') {
            //A status of 0 means success! Respond with 200: OK
            _id = result.request_id;
            res.render("OTP");
          } else {
            //A status other than 0 means that something is wrong with the request. Respond with 400: Bad Request
            //The rest of the status values can be found here: https://developer.nexmo.com/api/verify#status-values
            res.status(400).send(result);
          }
        }
      });
      
    
 
}

let check = (req, res) => {
    //To verify the phone number the request ID and code are required.
    console.log("check------>",Object.keys(req.session));
    if(req.session.userOtp)
    {
   console.log("session mil gya ",req.session.userOtp);
   
    let code = req.body.code;
    let requestId = _id;
    console.log("Code: " + code + " Request ID: " + requestId);
   
    nexmo.verify.check({request_id: requestId, code: code}, (err, result) => {
      if(err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        console.log(result)
        if(result && result.status == '0') {
          //A status of 0 means success! Respond with 200: OK
          // res.status(200).send(result);
          console.log('Account verified!');
          res.render("SignupPage");
        } 
        else {
          //A status other than 0 means that something is wrong with the request. Respond with 400: Bad Request
          //The rest of the status values can be found here: https://developer.nexmo.com/api/verify#status-values
          res.status(400).send(result);
          console.log('Error verifying account')
        }
      }
    });
  }
  else{
    console.log("session not found");
    res.render("LoginPage");
  }
}













module.exports = {
    indexPage:indexPage,
    signUpUser: signUpUser,
    otp:otp,
    check:check,
    OTPemail:OTPemail,
    emailVerify:emailVerify,
    Userdetails:Userdetails
}