const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) =>
{
    const token = req.headers["x-access-token"]
    if (!token)
    {
        res.send("No token");
    }
    else
    {
        jwt.verify(token,'secret',(err,decoded)=>
        {
            if(err)
            {
                res.json({auth : false , message : 'faild to auth'})
            }
            else 
            {
                res.userId= decoded.id;
                next();
            }
        })
    }
}


module.exports = verifyToken