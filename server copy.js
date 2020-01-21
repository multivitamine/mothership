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
var projectFileExists = fsFunctions.fileExists('./data/projects.json');
if(!projectFileExists){
    initFunctions.initProject()
}

var projects = fsFunctions.readFileSync('./data/projects.json');
//CREATE SERVER
var server = app.listen(process.env.PORT, listening);
function listening() {
    console.log('server listening');
}

//ADD WEBSITE INDEX
app.use(express.static('release-notes-app/build'));

//GET projects
app.get('/api/projects', getProjects);
function getProjects(request, response) {
    response.send(projects);
}
//POST project
app.post('/api/projects/add', addProject);
function addProject(request, response) {
    var params = request.body

    projects.push(params)
    fs.writeFile("./data/projects.json", JSON.stringify(projects, null, 2), finished)
    initFunctions.addRelease(params);
    response.send(projects)
}
//POST release notes
app.post('/api/projects/notes/add/:note', addRelease);
function addRelease(request, response) {
    var params = request.body
    var data = request.params;
    var note = data.note;


    const releaseNotes = fsFunctions.readFileSync(`./data/${note}.json`);
    releaseNotes.unshift(params)

    fs.writeFile(`./data/${note}.json`, JSON.stringify(releaseNotes, null, 2), finished)
 
    response.send(releaseNotes)
}
//GET A RELEASENOTE
app.get('/api/projects/notes/:note', getReleaseNote);
function getReleaseNote(request, response) {
    var data = request.params;
    var note = data.note;
    
    const releaseNote = fsFunctions.readFileSync(`./data/${note}.json`);

    response.send(releaseNote);
}
function finished (err) {
    console.log('write complete', err)
}

//PATCH A RELEASENOTE
app.post('/api/projects/notes/patch/:note', function (req, res) {
    var params = req.body
    var data = req.params;
    var note = data.note;
    const releaseNotes = fsFunctions.readFileSync(`./data/${note}.json`);
    var found = releaseNotes.find(function(element) {
        return element.key === params.key;
      });
      
    var releaseIndex = releaseNotes.findIndex(x => x.key === params.key)
    var newNotes = releaseNotes.slice()
    newNotes[releaseIndex] = params;
    console.log(newNotes, 'newNotes');
    console.log(releaseIndex, 'releaseIndex');
    
    fs.writeFile(`./data/${note}.json`, JSON.stringify(newNotes, null, 2), finished)
    res.send(releaseNotes);
})

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/release-notes-app/build/index.html'));
});