const mongoose=require('mongoose')
const categorySchema=new mongoose.Schema(
  {
    user:{
      type:mongoose.Schema.Types.ObjectId,  //mongodb creates an id for each reference user
      ref:"User",//creating a foreign key for the schema already created
      required:true  // it means the field is required no matter what
    },
    name:{
      type:String,
      required:true,
      default:"Uncategorized"   //if no name is provided, the user is declared uncategorised
    },
    type:{
      type:String,
      required:true,
      enum:["income","expense"]   //no other operation should be performed other then income and expense
    }
  },
  {
    timestamps:true // when it is created and updated (Internally there'is createdAt and updatedAt)
  }
)
module.exports=mongoose.model("Category",categorySchema);