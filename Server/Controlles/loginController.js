const express= require ('express')

const loginBL = require ('../Models/loginBL')

const appRouter = express.Router();

appRouter.route('/').post(loginBL.sign_in)

module.exports =appRouter;

