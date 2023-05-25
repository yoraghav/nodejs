const path = require ('path');
const express = require('express')
const route = express.Router()

const dirpath = path.join(__dirname,'..')

route.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile(path.join(dirpath,'views','subdir','index.html'))
})

route.get('/test(.html)?',(req,res)=>{
    res.sendFile(path.join(dirpath,'views','subdir','test.html'))
})

module.exports = route;