var fs = require("fs");

function readFileSync  ( path )  {
    
    var data = fs.readFileSync(path);
    return JSON.parse(data);
};

function fileExists ( path )  {
    if (fs.existsSync(path)) {
        return true;
    }else{
        return false;
    }
}

function mapExists ( path )  {
    fs.access(path, function(err) {
        if (err && err.code === 'ENOENT') {
            return true
        }
    });
    return false
}

exports.fileExists = fileExists;
exports.readFileSync = readFileSync; 
exports.mapExists = mapExists; 
