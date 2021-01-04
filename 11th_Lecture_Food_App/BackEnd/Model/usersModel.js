const mongoose= require("mongoose");
const { DB_LINK } = require("../config/secrets");
const crypto = require("crypto");

mongoose.connect
(DB_LINK, 
{useNewUrlParser: true, useUnifiedTopology: true}
)
.then((db)=>{
    console.log("Db Connected Successfully");
});

let userSchema= new mongoose.Schema({
    name : {
        type:String,
        required:true
      },
      email : {
        type:String ,
        required:true,
        unique:true
      },
      password:{
        type:String,
        minlength:[6 , "Password must be greater than 6 characters"],
        required:true
      } ,
      confirmPassword:{
        type:String,
        minlength:[6 , "Password must be greater than 6 characters"],
        validate : {
          validator: function(){
            return this.password == this.confirmPassword;
          } ,
          message:"Password didn't matched !!"
        }
      },
      role:{
        type:String,
        enum:["admin" , "user" , "restaurant owner" , "delivery boy"],
        default:"user"
      },
      pImage:{
        type: String,
        default: "/images/users/default.png"
      },
      pwToken: String,
      tokenTime: String 
})

// it will run before create is called on userModel
userSchema.pre("save", function(){
    this.confirmPassword= undefined;
})


userSchema.methods.createPwToken= function(){
  //token bnado
  let token= crypto.randomBytes(32).toString("hex");
  //token time bnado
  let time= Date.now() * 60 * 10 * 1000;
  
  this.pwToken= token;
  this.tokenTime= time;
  //set in current document

  return token;
}

userSchema.methods.resetPasswordHandler= function(password, confirmPassword){
  this.password= password;
  this.confirmPassword= confirmPassword;

  this.pwToken= undefined;
  this.tokenTime= undefined;
}

const userModel= mongoose.model("usercollection", userSchema);

module.exports= userModel;