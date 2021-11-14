const mongoose =require('mongoose')

let appSchema = mongoose.Schema;

let usersSchema = new appSchema (
    {
        fullname : String,
        username : String,
        password : String,
        token : String
    }
) 
module.exports = mongoose.model("users",usersSchema)