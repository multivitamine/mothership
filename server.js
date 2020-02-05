var express = require('express');
var http = require('http');
const socketio = require('socket.io');
var bodyParser = require("body-parser");
var app = express();
var fsFunctions = require('./lib/fs-functions');
var initFunctions = require('./lib/init-functions');
var dateFunctions = require('./lib/date-functions');
const path = require('path');
const cors = require("cors");
var fs = require("fs");
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
//GET JSONS
var releaseFileExists = fsFunctions.fileExists('./data/releases.json');
if(!releaseFileExists){
    initFunctions.initRelease()
}

//Get all json info
var releases = fsFunctions.readFileSync('./data/releases.json');

//CREATE SERVER
server.listen(process.env.PORT || 3002, () => console.log(`Server has started. `));

//io shizzle
const connectedUser = []
io.on('connection', (socket) => {
    const host = socket.handshake.headers.host;
    console.log(host);
    
    const newHostIndex = connectedUser.findIndex(x => socket.handshake.headers.host === x.hostName);
    
    if(newHostIndex === -1){
        console.log(1);
        
        connectedUser.push({hostName: socket.handshake.headers.host, count:1})
    }else{
        console.log(2);
        connectedUser[newHostIndex].count = connectedUser[newHostIndex].count + 1;
    }
    // socket.on('subscribeToTimer', (interval) => {
    //     console.log('client is subscribing to timer with interval ', interval);
    //     setInterval(() => {
    //         socket.emit('timer', new Date());
    //     }, interval);
    //   });
    socket.emit('sendConnectedUsers', connectedUser);
    socket.broadcast.emit('sendConnectedUsers', connectedUser);
    socket.on('disconnect', () => {
        
        const newHostIndex = connectedUser.findIndex(x => host === x.hostName);
        console.log(newHostIndex, 'índex');
        
        connectedUser[newHostIndex].count = connectedUser[newHostIndex].count - 1;
        
        socket.broadcast.emit('sendConnectedUsers', connectedUser);
        console.log(connectedUser, 'test');
    })
    console.log(connectedUser, 'test');
    
    socket.broadcast.emit('sendConnectedUsers', connectedUser);
})

//var server = app.listen(3002);
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
    
        response.send(errorLogs)
    }

    res.send(errorLogs);
})
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/mothership-app/build/index.html'));
});