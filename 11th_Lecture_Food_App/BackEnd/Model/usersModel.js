const mongoose= require("mongoose");

mongoose.connect
("mongodb+srv://lubhit123:lubhit123@cluster0.ugny9.mongodb.net/foodplan?retryWrites=true&w=majority", 
{useNewUrlParser: true, useUnifiedTopology: true}
).then((db)=>{
    console.log("Db Connected Successfully");
});

let userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: [6, 'Password must be of atleast 6 characters']
    },
    confirmPassword: {
        type: String,
        required: true,
        min: [6, 'Password must be of atleast 6 characters'],
        validate: {
            validator: function(){
                return this.password == this.confirmPassword;
            },
            message: "Passwords don't match"
        }
    },
    role: {
        type: String,
        enum: ["admin", "user", "restaurent owner", "delivery boy"],
        default: "user"
    }
})

// userSchema.pre("create", function(){
//     this.confirmPassword= undefined;
// })

const userModel= mongoose.model("usercollection", userSchema);

module.exports= userModel;