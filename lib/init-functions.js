var fs = require("fs");
var releases = [{name: 'CMS', version:'1.0.0', key: 'CMS' }]

//paths
var dataFolder = './data';
var releasesFile = 'releases.json';


function initAll  (path)  {
    fs.mkdir(dataFolder, { recursive: true }, (err) => {
        if (err) throw err;
    });
    fs.appendFileSync(dataFolder + '/' + releasesFile, JSON.stringify(releases, null, 2) , function (err) {
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


exports.initAll  = initAll ;
//exports.addRelease  = addRelease ;