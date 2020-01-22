var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var fsFunctions = require('./lib/fs-functions');
var initFunctions = require('./lib/init-functions');
const path = require('path');
const cors = require("cors");
var fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())


//GET JSONS
var releaseFileExists = fsFunctions.fileExists('./data/releases.json');
if(!releaseFileExists){
    initFunctions.initAll()
}
//Get all json info
var releases = fsFunctions.readFileSync('./data/releases.json');

//CREATE SERVER

var server = app.listen( process.env.PORT);
function listening() {
    console.log('server listening');
}

//ADD WEBSITE INDEX
app.use(express.static('mothership-app/build'));

//APIS
//GET releases
app.get('/api/releases', getReleases);
function getReleases(request, response) {
    response.send(releases);
}

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/mothership-app/build/index.html'));
});