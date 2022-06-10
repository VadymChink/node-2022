/*
const {createUser} = require('./services/user.service');
require('./services/file.service');

const user = createUser('Vadym', 27);

user.seyHello();*/

/*
let path = require('path');

const reMove = (dir, newDir, userGender) => {
    fs.readdir(dir, (err, files) => {
        if (err) return console.log(err)

        files.forEach(file => {
            const link = path.join(__dirname, dir, file);

            fs.readFile(link, (err, data) => {
                if (err) return console.log(err)
                let {gender} = JSON.parse(data.toString());

                if (gender === userGender) {
                    fs.rename(link, path.join(__dirname, newDir, file), (err) => {
                        if (err) return console.log(err)
                    })
                }
            })
        })
    })
}

reMove('./boys', './girls', 'female');
reMove('./girls', './boys', 'male');

*/

let fs = require('fs');
let path = require('path');

/*function f(read) {
    fs.readdir(read, (err, files) => {
            if (err) return console.log(err);

            for (const file of files) {
                fs.stat(path.join(read, file), (err1, stats) => {
                    if (err1) return console.log(err1)

                    if (stats.isFile()) {
                        fs.rename(path.join(read, file), path.join(__dirname, 'as', file), (err) => {
                            if (err) return console.log(err);
                        })
                    }

                    if (stats.isDirectory) {
                        return f(path.join(read, file))
                    }

                })
            }
        }
    )
}*/

// f(path.join(__dirname, 'move'));
