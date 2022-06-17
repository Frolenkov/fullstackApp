const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
const File =require('../../models/File');
const config = require('config');

class FileService {

    createDir(file) {
        const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`
        return new Promise (((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: "File was created"})
                } else {
                    return reject({message: "File already exist"})
                }
            } catch (e) {
                console.log(e)
                return reject({message:'File error'})
            }
        }))
    } 
};

module.exports = new FileService;