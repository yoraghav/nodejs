const { log } = require('console')
const {format} = require('date-fns')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const func = async (msg,logname)=>{
    // console.log(`is this the msg? ${msg}`)
    const logmsg = `${format(new Date(),'yyyyMMdd\tHH:mm:ss')}\t${msg}\n`
    try{
        const p = path.join(__dirname,'..','logs');
        if(!fs.existsSync(p)){
            await fsPromises.mkdir(p)
        }
        await fsPromises.appendFile(path.join(p,logname),logmsg)
    }catch(err){console.log(err)}
}

const logger = (req,res,next)=>{
    func(`${req.method}\t${req.headers.origin}\t${req.method}`,'reqlogs,txt')
    next()
}
module.exports = {logger,func};  