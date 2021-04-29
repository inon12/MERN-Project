const express = require ('express')

const moviesBL = require('../Models/moviesBL')

const appRouter = express.Router();

appRouter.route('/')
.get(async function(req,resp)
{
   let result = await moviesBL.getAll();
   return resp.json(result);
})
appRouter.route('/:id')
.get(async function(req,resp)
{
    let id = req.params.id;
    let result = await moviesBL.getById(id)
    return resp.json(result)
})
appRouter.route('/')
.post(async function(req,resp)
{
    let newMovie = req.body;
    let result = await moviesBL.addNew(newMovie)
    return resp.json(result)
})
appRouter.route('/:id')
.put(async function(req,resp)
{
    let id = req.params.id
    let newMovie = req.body;
    let result = await moviesBL.update(id,newMovie)
    return resp.json(result)
})
appRouter.route('/:id')
.delete(async function(req,resp)
{
    let id = req.params.id
    let result = await moviesBL.delete(id)
    return resp.json(result)
})

module.exports = appRouter