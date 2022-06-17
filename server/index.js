const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const fileUpload = require("express-fileupload");
const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");
const filePathMiddleware = require("./middleware/filePath.middleware");
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || config.get("serverPort");
const dbURL = config.get("dbURL");

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(filePathMiddleware(path.resolve(__dirname, 'files')));
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static('static'));
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

const start = async () => {
    try {
        mongoose.connect(dbURL);

        app.listen(PORT, () => {
            console.log("Server started on port", PORT);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
