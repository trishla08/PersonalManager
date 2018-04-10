var http = require('http');
var url = require('url');
var fs = require('fs');
/*
http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }  
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);
*/
var express = require('express');

var path    = require("path");

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(__dirname));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/submit', function(req,res){
    console.log("hello");
    res.sendFile(path.join(__dirname+'/signup.html'));
})

app.post('/submit', function(req, res){
    var name=req.body.name;

    var email=req.body.email;

    var username=req.body.username;
    //Prints Name
    console.log("hello" + name);
    
    //Redirect to homepage
    res.redirect('/');

})

app.listen('8080', function(){
    console.log('Server has Started!');
})