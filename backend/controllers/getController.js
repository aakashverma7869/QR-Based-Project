const User = require("../models/user")


let index = (req, res) => {
    console.log("entry in index function get-->>>");
    const userID = req.session.userid;
    console.log("print id--->",userID);
    User.findOne({ _id : userID }, (err, user) => {
        console.log("Entry of DB...........")
          if (err || !user) {
            console.log("Data not found");
            res.redirect("/");
        }
        else{
            console.log("print user------->>",user);
            res.render("index",{"userName": user.name,"userPhone":user.phone,"status":"Successfully"});
        } 
    });
}


let login = (req, res) => {
    console.log("Login page redirect")
    
    req.session.loginstatus = req.session.loginstatus || null
    res.render("LoginPage",{"status": req.session.loginstatus});
}
let signup = (req, res) => {
    res.render("SignupPage");
}
let phonenumber = (req, res) => {
    res.render("PhoneNumber");
}
let email = (req, res) => {
    res.render("email");
}
const logout = (req,res) =>{
    req.session.destroy(function(err) {
      console.log("session is destroyed");
    })
  res.redirect("/");
  }





module.exports = {
    index:index,
    login:login,
    signup:signup,
    phonenumber:phonenumber,
    logout:logout,
    email:email
}