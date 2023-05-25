const whitelist = ['http://localhost:8000','http://localhost:8080','https://www.google.com']
const corsOptions = {
    origin: (origin,callback)=>{
        if(whitelist.indexOf(origin)!==-1||!origin){
            callback(null,true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },optionsSuccessStatus:200
}

module.exports = corsOptions