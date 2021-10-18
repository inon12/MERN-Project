const mongoose = require('mongoose')

let appSchema=mongoose.Schema;


let movieSchme = new appSchema (
    {
        id : Number,
        name : String,
        genres : [String],
        premiered : String,
        image : String,
        summary : String
    }
)


module.exports = mongoose.model('movies',movieSchme)