const fs = require('fs');

/* fs.appendFile('./data.txt', 'hello node', (err)=>{
    if (err){
        console.log(err);
    }
})*/

fs.writeFile('./data.txt', 'hello node', (err) => {
    if (err) {
        console.log(err);
    }
})

fs.readFile('./data.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
    console.log(data.toString());
})

/*
fs.readdir('./services', (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    for (const file of files) {
        console.log(file);

        fs.stat(`./services/${file}`, (err, stats) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(stats.isFile(),'stats.isFile');
            console.log(stats.isDirectory(),'stats.isDirectory');
        })
        /!*fs.readFile(`./services/${file}`, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(data.toString());
        })*!/
    }
})*/
/*fs.mkdir('./utils', err => {
    err && console.log(err);
})*/

fs.rename('./services/toMove.js', './utils/helloWorld.txt', err => {
    err && console.log(err)
})

