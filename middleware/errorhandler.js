const {func} = require('./tutserver')

const errorhandler = (err,req,res,next)=>{
    func(`${err.name}\t${err.message}`,'errlog.txt')
    console.error(err);
    res.status(500).send(err.message)
    next()
}

module.exports = errorhandler