const express = require ('express')

const subscriptionsBL = require('../Models/subscriptionsBL')

const appRouter = express.Router();

appRouter.route('/')
.get(async function(req,resp)
{
   let result = await subscriptionsBL.getAll();
   return resp.json(result);
})
appRouter.route('/:id')
.get(async function(req,resp)
{
    let id = req.params.id;
    let result = await subscriptionsBL.getById(id)
    return resp.json(result)
})
appRouter.route('/')
.post(async function(req,resp)
{
    let newMovie = req.body;
    let result = await subscriptionsBL.addNew(newMovie)
    return resp.json(result)
})
appRouter.route('/:id')
.put(async function(req,resp)
{
    let id = req.params.id
    let newMovie = req.body;
    let result = await subscriptionsBL.update(id,newMovie)
    return resp.json(result)
})
appRouter.route('/:id')
.delete(async function(req,resp)
{
    let id = req.params.id
    let result = await subscriptionsBL.delete(id)
    return resp.json(result)
})

module.exports = appRouter