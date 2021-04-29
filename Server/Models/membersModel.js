const mongoose =require('mongoose')

let appSchema = mongoose.Schema;

let membersSchema = new appSchema (
    {
        fullname : String,
        email : String,
        city : String
        
    }
) 
module.exports = mongoose.model("members",membersSchema)