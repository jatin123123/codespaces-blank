const mongoose=require("mongoose")

const dbConnect=async()=>{
    try {
        await mongoose.connect("mongodb+srv://jatinjangid947:KWhi9qrI6GmPDqWv@cluster0.us8c0kb.mongodb.net/book")
        console.log("Db Connect Successfully");
    } catch (error) {
        console.log(error);
    }
}
module.exports = dbConnect;