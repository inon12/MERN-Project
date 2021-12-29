const express = require ('express')

const membersBL = require('../Models/membersBL')
const verifyToken = require("../Middelware/authJwt")

const appRouter = express.Router();

appRouter.route('/')
.get(verifyToken,async function(req,resp)
{
   let result = await membersBL.getAll();
   return resp.json(result);
})
appRouter.route('/:id')
.get(verifyToken,async function(req,resp)
{
    let id = req.params.id;
    let result = await membersBL.getById(id)
    return resp.json(result)
})
appRouter.route('/')
.post(verifyToken,async function(req,resp)
{
    let newMovie = req.body;
    let result = await membersBL.addNew(newMovie)
    return resp.json(result)
})
appRouter.route('/:id')
.put(verifyToken,async function(req,resp)
{
    let id = req.params.id
    let newMovie = req.body;
    let result = await membersBL.update(id,newMovie)
    return resp.json(result)
})
appRouter.route('/:id')
.delete(verifyToken,async function(req,resp)
{
    let id = req.params.id
    let result = await membersBL.delete(id)
    return resp.json(result)
})

module.exports = appRouter