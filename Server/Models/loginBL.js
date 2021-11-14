const users = require ('./usersModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


exports.sign_in = function(req,res)
{
        
        users.findOne({username : req.body.username}).exec((err,user) =>
        {
            console.log(user)
            if(err)
            {
                res.status(500).send({massege : err})
                return;
            }
            if(!user)
            {
                return res.status(404).send({message : "user not found"})
            }
            if(user.password != req.body.password)
            {
                return res.status(401).send({
                    accessToken : null,
                    message : "Invalid Password "
                })
            }
            let token = jwt.sign({fullname : user.fullname}, "secret" )
            console.log(token)
            // req.session.user=user;
            res.json({auth : true ,token : token ,user : user})

            
        })
    }    