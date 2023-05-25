const path = require ('path');
const express = require('express')
const route = express.Router()
const registerController = require('../controllers/registerController')

route.get('/',(req,res)=>{res.render("../views/register.ejs")})

route.post('/',registerController.handleNewUser)

module.exports = route;