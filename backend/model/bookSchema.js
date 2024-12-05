const mongoose=require("mongoose");

const bookSchema=new mongoose.Schema({
    imageurl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true 
    },
    description:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'User',
        required:true
    }
},{timestamps:true});

const Book=mongoose.model("Book",bookSchema);
module.exports = Book;