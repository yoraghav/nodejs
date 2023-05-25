const path = require ('path');
const express = require('express')
const route = express.Router()

const dirpath = path.join(__dirname,'..')

route.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile(path.join(dirpath,'views','index.html'))
})

route.get('/new-page(.html)?',(req,res)=>{
    res.sendFile(path.join(dirpath,'views','new-page.html'))
})

route.get('/old-page(.html)?',(req,res)=>{
    res.redirect(301,'/new-page.html')
})

module.exports = route;