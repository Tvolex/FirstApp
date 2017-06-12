const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const DBurl = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

var getNews = router.get("/getMaxID", (req,res) => {

    MongoClient.connect(DBurl, (err, db) => {
        if (err) {
            console.log('Unable to connect to the MongoDB server. Error:', err);
        } else {
            console.log('Connection to db', DBurl);
            var collection = db.collection('news');
            collection.find().reverce().limit(1).next((e, result) => {
                if(!e) {
                    console.log(result.ID);
                    return result.ID;
                } else {
                    return 'error';
                }
            });
        }
        db.close();
    });
});
module.exports = getNews;
