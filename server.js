var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var fsFunctions = require('./lib/fs-functions');
var initFunctions = require('./lib/init-functions');
var dateFunctions = require('./lib/date-functions');
const path = require('path');
const cors = require("cors");
var fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//GET JSONS
var releaseFileExists = fsFunctions.fileExists('./data/releases.json');
if(!releaseFileExists){
    initFunctions.initRelease()
}

//Get all json info
var releases = fsFunctions.readFileSync('./data/releases.json');

//CREATE SERVER
var server = app.listen( process.env.PORT);
function listening() {
    console.log('server listening');
}

function finished
 (err) {
    console.log('write complete', err)
}

//ADD WEBSITE INDEX
app.use(express.static('mothership-app/build'));

//APIS
//GET releases
app.get('/api/releases', getReleases);
function getReleases(request, response) {
    response.send(releases);
}
//GET ERRORLOGS
app.get('/api/errorlogging', getErrors);
function getErrors(request, response) {
   
    const errorLogDates = [];
    const files = fs.readdirSync('./data/errorlogging');
    console.log(files);
    
    //const currentDate = dateFunctions.getDate();
    //var errors = fsFunctions.readFileSync(`./data/errorlogging/${currentDate}.json`);

    response.send(files);
}
app.get('/api/errorlogging/:date', getErrorsByDate);
function getErrorsByDate(request, response) {
    var data = request.params;
    var date = data.date;
    
    var errorFile = fsFunctions.readFileSync(`./data/errorlogging/${date}.json`);

    response.send(errorFile);
}
//POST ERROR
app.post('/api/errorlogging', function (request, res, next) {
	
    let errorLogs = ''
    const {url} = request.body;
    const params = request.body;
    
    const isLocal = url.indexOf('localhost') !== -1;

    const splittedUrl = isLocal ? url.split('/static') : url.split('/admin');
	
    params.realUrl = splittedUrl[0];
    params.dateCreated = new Date();
    
    //var releaseFileExists = fsFunctions.fileExists('./data/releases.json');
    const currentDate = dateFunctions.getDate();

    const errorFileExists = fsFunctions.fileExists(`./data/errorlogging/${currentDate}.json`);
    if(!errorFileExists){
        const newArray = [params]
        initFunctions.initErrorFile(currentDate, newArray)
    }else{
        errorLogs = fsFunctions.readFileSync(`./data/errorlogging/${currentDate}.json`);
        errorLogs.unshift(params)

        fs.writeFile(`./data/errorlogging/${currentDate}.json`, JSON.stringify(errorLogs, null, 2), finished)
    
        res.send(errorLogs)
    }

    res.send(errorLogs);
})
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/mothership-app/build/index.html'));
});