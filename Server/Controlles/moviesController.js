const express = require ('express')

const moviesBL = require('../Models/moviesBL')

const appRouter = express.Router();
const verifyToken = require("../Middelware/authJwt")

appRouter.route('/')
.get(verifyToken,async function(req,resp)
{
   let result = await moviesBL.getAll();
   return resp.json(result);
})
appRouter.route('/:id')
.get(verifyToken,async function(req,resp)
{
    let id = req.params.id;
    let result = await moviesBL.getById(id)
    return resp.json(result)
})
appRouter.route('/')
.post(verifyToken,async function(req,resp)
{
    let newMovie = req.body;
    let result = await moviesBL.addNew(newMovie)
    return resp.json(result)
})
appRouter.route('/:id')
.put(verifyToken,async function(req,resp)
{
    let id = req.params.id
    let newMovie = req.body;
    let result = await moviesBL.update(id,newMovie)
    return resp.json(result)
})
appRouter.route('/:id')
.delete(verifyToken,async function(req,resp)
{
    let id = req.params.id
    let result = await moviesBL.delete(id)
    return resp.json(result)
})

module.exports = appRouter