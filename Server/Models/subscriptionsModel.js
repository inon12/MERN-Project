const mongoose =require('mongoose')

let appSchema = mongoose.Schema;

let subscriptionsSchema = new appSchema (
    {
        memberId : String,
        movieId : String,
        date  : String
    }
) 
module.exports = mongoose.model("subscriptions",subscriptionsSchema)