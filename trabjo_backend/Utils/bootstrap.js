const mongoose = require('mongoose');
const Config = require('../Config');
const Modal = require('../Models');
mongoose.Promise = global.Promise;
// let Service = require('../Services').queries;
// let async = require('async');
// const TokenManager = require('../Lib/TokenManager');
// let SocketManager = require('../Lib/SocketManager');

mongoose.connect(Config.dbConfig.config.dbURI,{ useMongoClient: true }, function (err) {
    if (err) {
        console.log("DB Error: ", err);
        process.exit(1);
    } else {
        console.log('MongoDB Connected');
    }
});
