const config = {};


if(process.env.ENV == 'dev') {
    config.port = 3000;
    config.DBurl = 'mongodb://127.0.0.17:27017/FirstApp';
} else {
    config.port = process.env.PORT;
    config.dbName = "firstappusers";
    config.dbHost = "Tvolex:Tvolex3913@ds031895.mlab.com";
    config.dbPort = "31895";
    config.DBurl = process.env.ENV ||`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

module.exports = config;