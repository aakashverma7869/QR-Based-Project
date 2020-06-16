var mongoose = require("mongoose");
var userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      trim: true,
    
    },
    password: {
      type: String,
      required: true
    },
    name: {
        type: String,
        maxlength: 32,
        trim: true
      },
      email: {
        type: String,
        trim: true
      },
      bussiness:{
        type: String,
        trim: true
      },
      revenue:{
        type: String,
        trim: true
      },
      website:{
        type: String,
        trim: true
      },
      category:{
        type: String,
        trim: true
      },
      billing:{
        type: String,
        trim: true
      },
      panNo:{
        type: String,
        trim: true
      },

      bussinessName:{
        type: String,
        trim: true
      },
      authPan:{
        type: String,
        trim: true 
      },
      panOwner:{
        type: String,
        trim: true 
      },
      address:{
        type: String,
        trim: true 
      },
      pinCode:{
        type: String,
        trim: true 
      },
      city:{
        type: String,
        trim: true
      },
      state:{
        type: String,
        trim: true
      }




  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
