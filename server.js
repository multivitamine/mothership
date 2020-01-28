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
    initFunctions.initRelease()
}
var errorLoggingDirectoryExists = fsFunctions.mapExists('./data/errorlogging');
if(!errorLoggingDirectoryExists){
    initFunctions.initErrorDirectory();
}
//Get all json info
var releases = fsFunctions.readFileSync('./data/releases.json');

//CREATE SERVER

var server = app.listen(3001);
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
//POST ERROR
app.post('/api/errorlogging', function (request, res) {
    let errorLogs = ''
    const {url} = request.body;
    const params = request.body;
    
    const splittedUrl = url.split('/static');
    params.realUrl = splittedUrl[0];

    //var releaseFileExists = fsFunctions.fileExists('./data/releases.json');
    const currentTime = new Date();

    // returns the month (from 0 to 11)
    const month = currentTime.getMonth() + 1;

    // returns the day of the month (from 1 to 31)
    const day = currentTime.getDate();

    // returns the year (four digits)
    const year = currentTime.getFullYear();
    const date = day + "-" + month + "-" + year;

    const errorFileExists = fsFunctions.fileExists(`./data/errorlogging/${date}.json`);
    if(!errorFileExists){
        const newArray = [params]
        initFunctions.initErrorFile(date, newArray)
    }else{
        console.log(2);
        errorLogs = fsFunctions.readFileSync(`./data/errorlogging/${date}.json`);
        errorLogs.unshift(params)

        fs.writeFile(`./data/errorlogging/${date}.json`, JSON.stringify(errorLogs, null, 2), finished)
    
        response.send(errorLogs)
    }

    res.send(errorLogs);
})
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/mothership-app/build/index.html'));
});