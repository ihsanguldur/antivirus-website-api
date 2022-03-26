const express = require("express");
const dotenv = require("dotenv");
const databaseConnection = require("./config/dbconnection.js");
const routers = require("./routers");
const errorHandler = require("./middlewares/errors/errorHandler.js");

dotenv.config({
    path : "./config/config.env"
});

const {PORT} = process.env;

databaseConnection();

const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(express.json());
app.use("/api", routers);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log("server started on "+PORT);
});