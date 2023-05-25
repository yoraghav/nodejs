const http = require('http') ;
const path = require ('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const func = require('./tutserver')
const EventEmitter = require('events')

class MyEmitter extends EventEmitter{};

const myEmitter = new MyEmitter();
myEmitter.on('log',(msg,filename)=>func(msg,filename))

const servefile = async(filepath,contenttype,response)=>{
    try{
        const Rawdata = await fsPromises.readFile(filepath,
            !contenttype.includes('image') ? 'utf8' : '');
        const data = contenttype==='application/json'?JSON.parse(Rawdata):Rawdata 
        response.writeHead(
            filepath.includes('404.html')?404:200,
            {'Content-Type':contenttype});
        response.end(contenttype==='application/json'?JSON.stringify(data):data);
         
    } catch(err){
        console.log(err);
        myEmitter.emit('log',`${err.name}\t${err.message}`,'errlog.txt')
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req,res)=>{
    console.log(req.url,req.method)
    const extension = path.extname(req.url)

    myEmitter.emit('log',`${req.url}\t${req.method}`,'reqLog.txt')
    let contenttype;

    switch(extension){
        case '.js':
            contenttype = 'text/javascript'
            break;
        case '.txt':
            contenttype = 'text/plain'
            break;
        case '.json':
            contenttype = 'application/json'
            break;
        case '.css':
            contenttype = 'text/css'
            break;
        case '.png':
            contenttype = 'image/png'
            break;
        case '.jpg':
            contenttype = 'image/jpeg'
            break;
        default:
            contenttype = 'text/html'

    }

    const dirpath = path.join(__dirname,'..','..')

    let filepath = (contenttype === 'text/html' && req.url === '/')
        ? path.join(dirpath,'views','index.html')
            : contenttype === 'text/html' && req.url.slice(-1) === '/' 
                ? path.join(dirpath, 'views', req.url, 'index.html'):contenttype === 'text/html'
                ? path.join(dirpath, 'views', req.url): path.join(dirpath, req.url);
    
    if(!extension && req.url.slice(-1)!=='/') filepath += '.html'

    console.log(`filename requested = ${filepath}`)
    const fileExists = fs.existsSync(filepath);
    
    if(fileExists){
        servefile(filepath,contenttype,res)
    } else {
        switch(path.parse(filepath).base){
            case 'old-page.html':
                res.writeHead(301,{'Location':'/new-page.html'});
                res.end()
                break;
            default:
                servefile(path.join(dirpath,'views','404.html'),'text/html',res)
        }
        console.log(path.parse(filepath)); 

    }
})

server.listen(8080,()=>console.log('server running!'));
