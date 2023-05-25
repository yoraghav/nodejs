var url = require('url')
var http = require('http');
var fs = require('fs');
var path = require('path');

const server = http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  console.log("🚀 ~ file: server.js:8 ~ q:", q);
  let bb;
  const qpath = q.pathname;
  switch (qpath) {
    case '/blah.js':
      console.log("🚀 ~ file: index.js:15 ~ path.resolve(__dirname,'./blah'):", path.resolve(__dirname, '../client/blah.js'))
      try {
        //read the  file using FS module 
        //revert back in rsponse 
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        console.log(__dirname);
        bb = fs.readFileSync(path.resolve(__dirname, '../client/blah.js')).toString();
        // bb = "<script>" + bb + "</script>"
        console.log("🚀 ~ file: index.js:19 ~ bb:", bb)
        
      } catch (e) {
        console.log('error in 1')
      }

      break;
    default:
      // var filename = "." + q.pathname + ".js";
      console.log(__dirname)
      var fileContents = fs.readFileSync(path.resolve(__dirname, '../../client/base.html')).toString()
      res.writeHead(200, { 'Content-Type': 'text/html' });
      // bb = "<script>" + fileContents + "</script>"
      bb = `${fileContents} current date : ${new Date()}`;
      break;
  }
  res.write(bb);
  res.end();
});

server.listen(8080,function(e){
  if(e) console.log('server error')
  else console.log('success w server')
})