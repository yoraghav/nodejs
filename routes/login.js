const path = require ('path');
const express = require('express')
const route = express.Router()
const authController = require('../controllers/authController')

route.post('/',authController.authlogin)

module.exports = route;