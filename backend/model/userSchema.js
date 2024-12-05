const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userImage:{
        type:String,
        required:true
    }
},{timestamps:true});

const User=mongoose.model("User",userSchema);

module.exports=User;