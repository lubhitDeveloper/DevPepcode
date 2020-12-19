const mongoose= require("mongoose");

mongoose.connect("mongodb+srv://lubhit123:lubhit123@cluster0.ugny9.mongodb.net/foodplan?retryWrites=true&w=majority",
 {useNewUrlParser: true, useUnifiedTopology: true}
 ).then((db)=> {
     console.log("Connected to db !!!");
 });

 let planSchema= new mongoose.Schema({
     name: {
         type: String,
         required: true,
         maxlength: [40, "Your Plan Name is more than 40 characters !!"]
     },
     duration: {
         type: Number,
         required: true
     },
     price: {
         type: Number,
         required: true
     },
     ratings: Number,
     discount: {
         type: Number,
         validate: {
             validator: function(){
                 return this.discount < this.price;
             },
             message: "Discount must be less than the actual price of the item !"
         }
     }
 })

 const planModel= mongoose.model("planscollection", planSchema);

 module.exports= planModel;