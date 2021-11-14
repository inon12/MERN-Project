const express = require ('express')

const usersBL = require('../Models/usersBL')

const appRouter = express.Router();
// const verifyToken = require('../Middelware/authJwt')

appRouter.route('/')
.get(async function(req,resp)
{
   let result = await usersBL.getAll();
   return resp.json(result);
})

// appRouter.get('/:id',verifyToken,(async function(req,resp)
// {
//    let result = await usersBL.getAll();
//    return resp.json(result);
// }))

appRouter.route('/:id')
.get(async function(req,resp)
{
    let id = req.params.id;
    let result = await usersBL.getById(id)
    return resp.json(result)
})

appRouter.route('/')
.post(async function(req,resp)
{
    let newMovie = req.body;
    let result = await usersBL.addNew(newMovie)
    return resp.json(result)
})

appRouter.route('/:id')
.put(async function(req,resp)
{
    let id = req.params.id
    let newMovie = req.body;
    let result = await usersBL.update(id,newMovie)
    return resp.json(result)
})

appRouter.route('/:id')
.delete(async function(req,resp)
{
    let id = req.params.id
    let result = await usersBL.delete(id)
    return resp.json(result)
})

module.exports = appRouter