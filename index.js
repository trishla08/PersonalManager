var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (!err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
     
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  }
  });

  var express = require("express");

var app     = express();

var path    = require("path");

var mysql = require('mysql');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

var con = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "",

  database: "mydb"

});

app.get('/',function(req,res){

  res.sendFile(path.join(__dirname+'/index.html'));

});

app.post('/submit',function(req,res){


  var name=req.body.name;

  var email=req.body.email;

  var username=req.body.username;

  res.write('You sent the name "' + req.body.name+'".\n');

  res.write('You sent the email "' + req.body.email+'".\n');

  res.write('You sent the username "' + req.body.userid+'".\n');


  con.connect(function(err) {

  if (err) throw err;

  var sql = "INSERT INTO form (name, email,description) VALUES ('"+name+"', '"+email+"','"+username+"')";

  con.query(sql, function (err, result) {

    if (err) throw err;

    console.log("1 record inserted");

     res.end();
  });
  });
})


}).listen(8080);



