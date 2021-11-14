const express= require ('express')

const loginBL = require ('../Models/loginBL')

const appRouter = express.Router();

appRouter.route('/').post(loginBL.sign_in
//     async function (req,res)
// {
//     let username= req.body.username;
//     let password= req.body.password;
//     console.log("1")
//     let result= await loginBL.sign_in(username,password)
//     console.log("2")
//     return res.json(result);
// }
)

module.exports =appRouter;



















// const express = require ('express')

// const usersBL = require('../Models/usersBL')

// const appRouter = express.Router();

// appRouter.route('/')
// .get(async function(req,resp)
// {
//    let result = await usersBL.getAll();
//    return resp.json(result);
// })
// appRouter.route('/:id')
// .get(async function(req,resp)
// {
//     let id = req.params.id;
//     let result = await usersBL.getById(id)
//     return resp.json(result)
// })
// appRouter.route('/')
// .post(async function(req,resp)
// {
//     let newMovie = req.body;
//     let result = await usersBL.addNew(newMovie)
//     return resp.json(result)
// })
// appRouter.route('/:id')
// .put(async function(req,resp)
// {
//     let id = req.params.id
//     let newMovie = req.body;
//     let result = await usersBL.update(id,newMovie)
//     return resp.json(result)
// })
// appRouter.route('/:id')
// .delete(async function(req,resp)
// {
//     let id = req.params.id
//     let result = await usersBL.delete(id)
//     return resp.json(result)
// })

// module.exports = appRouter