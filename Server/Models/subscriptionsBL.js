const movies = require ('./subscriptionsModel')



exports.getAll = function()
{
    return new Promise ((resolve,reject) =>
    {
        movies.find({},function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data)
            }
        })
    })
}
exports.getById = function(id)
{
    return new Promise ((resolve,reject)=>
    {
        movies.findById(id,function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })
}
exports.addNew = function(newObj)
{
    return new Promise((resolve ,reject)=>
    {
        let newMovie = new movies (newObj)

        newMovie.save((err)=>
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve("created!")
            }
        })
    })
}
exports.update = function (id,newObj)
{
    return new Promise ((resolve,reject)=>
    {
        movies.findByIdAndUpdate(id,newObj,function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve("updated!")
            }
        })
    })
}
exports.delete = function (id)
{
    return new Promise ((resolve,reject)=>
    {
        movies.findByIdAndDelete(id,function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve("Deleted!")
            }
        })
    })
}

