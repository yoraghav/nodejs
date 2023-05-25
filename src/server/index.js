
const path = require ('path');
const cors = require('cors')
const express = require('express')
const app = express()
const {logger} = require('../../middleware/tutserver')
const errorhandler = require('../../middleware/errorhandler')
const dirpath = path.join(__dirname,'..','..');
const corsOptions = require(path.join(dirpath,'config','corsOptions'))
const calc = require('raghavscalcpack').firstmathlab
// const calc = firstmathlab

app.use(logger)
app.use(cors(corsOptions))

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/',express.static(path.join(dirpath,'public')))
app.use('/subdir',express.static(path.join(dirpath,'public')))

app.use('/',require('./../../routes/root'))
app.use('/register',require('./../../routes/register'))
app.use('/login',require('./../../routes/login'))
app.use('/subdir',require('./../../routes/subdir'))
app.use('/employees',require('./../../routes/api/employees'))


app.get('/*',(req,res)=>{
    res.status(404);
    req.accepts('html')?res.sendFile(path.join(dirpath,'views','404.html')):req.accepts('json')?res.json({error:"404 Not Found"}):res.type('txt').send("404 not found")
})
app.use(errorhandler)

app.listen(8080,()=>{console.log('server running!');console.log(calc('sub',5,4))});
