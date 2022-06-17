const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
const File =require('../../models/File');
const config = require('config');
const { deflateSync } = require("zlib");

class FileService {

    createDir(req, file) {
        const filePath = this.getPath(req, file)
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

    deleteFile(req, file) {
        const path = this.getPath(req, file);
        if (file.type == "dir") {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    getPath(req, file) {
        return  `${req.filePath}\\${file.user}\\${file.path}`;
    }
};

module.exports = new FileService;