var fs = require("fs");
var releases = [{name: 'CMS', version:'1.0.0', key: 'CMS' }]

//paths
var dataFolder = './data';
var errorFolder = './data/errorlogging';
var releaseFolder = './data/releases';
var releasesFile = 'releases.json';


function initRelease  (path)  {
    fs.mkdir(dataFolder, { recursive: true }, (err) => {
        if (err) throw err;
    });
    fs.mkdir(releaseFolder, { recursive: true }, (err) => {
        if (err) throw err;
    });
    fs.appendFileSync(dataFolder + '/' + releasesFile, JSON.stringify(releases, null, 2) , function (err) {
    if (err) throw err;
        console.log('Saved!');
    });
}
function initErrorDirectory  (path)  {
    fs.mkdir(errorFolder, { recursive: true }, (err) => {
        if (err) throw err;
    });
}
function initErrorFile  (filename, object)  {
    console.log(filename, object);
    
    fs.appendFileSync(errorFolder + '/' + filename + '.json', JSON.stringify(object, null, 2) , function (err) {
    if (err) throw err;
        console.log('Saved!');
    });
}



// function addRelease  (params)  {

//     const release = [{  
//         key: `${params.key}-1-0-0`,
//         title: `${params.key} 1.0.0`,
//         versionNumber: `1.0.0`,
//         body: "<p>release 1</p>",
//     }]

//     fs.appendFileSync(dataFolder + '/' + `${params.key}.json`, JSON.stringify(release, null, 2) , function (err) {
//     if (err) throw err;
//         console.log('Saved!');
//     });

// }


exports.initRelease = initRelease;
exports.initErrorDirectory = initErrorDirectory;
exports.initErrorFile = initErrorFile;
//exports.addRelease  = addRelease ;