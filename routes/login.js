const path = require ('path');
const express = require('express')
const route = express.Router()
const authController = require('../controllers/authController')

route.get('/',(req,res)=>{res.render("../views/login.ejs")})

route.post('/',authController.authlogin)

module.exports = route;